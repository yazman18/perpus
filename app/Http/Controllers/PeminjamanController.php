<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PeminjamanController extends Controller
{
    public function index()
    {
        $peminjamans = Peminjaman::with('book')
            ->where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'nama' => $p->nama,
                    'kelas' => $p->kelas,
                    'tanggal_pinjam' => $p->tanggal_pinjam,
                    'durasi' => $p->durasi,
                    'tanggal_kembali' => $p->tanggal_kembali,
                    'status_peminjaman' => $p->status_peminjaman,
                    'status_pengembalian' => $p->status_pengembalian,
                    'book' => [
                        'title' => $p->book->title,
                        'author' => $p->book->author,
                        'image' => $p->book->image,
                    ],
                ];
            });

        return Inertia::render('PeminjamanPage', [
            'peminjamans' => $peminjamans,
        ]);
    }

    public function create($book_id)
    {
        $book = Book::findOrFail($book_id);
        $user = Auth::user();
        $books = Book::where('stock', '>', 0)->get();
        $users = User::all();
        return Inertia::render('PeminjamanForm', [
            'book' => $book,
            'user' => $user,
            'books' => $books,
            'users' => $users,
        ]);
    }


    public function store(Request $request)
    {
        $rules = [
            'nama' => 'required|string|max:255',
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'tanggal_pinjam' => 'required|date',
        ];
        if (Auth::user()->role != 'guru') {
            $rules['kelas'] = 'required|string|max:255';
        }

        $validated = $request->validate($rules);
        $book = Book::findOrFail($validated['book_id']);

        if ($book->stock <= 0) {
            return back()->withErrors(['book_id' => 'Stok buku habis']);
        }
        $book->decrement('stock');
        $tanggalPinjam = new \Carbon\Carbon($validated['tanggal_pinjam']);
        $tanggalKembali = $tanggalPinjam->addDays(7);

        Peminjaman::create([
            'user_id' => $validated['user_id'],
            'nama' => $validated['nama'],
            'kelas' => isset($validated['kelas']) ? $validated['kelas'] : null,
            'book_id' => $validated['book_id'],
            'tanggal_pinjam' => $validated['tanggal_pinjam'],
            'tanggal_kembali' => $tanggalKembali->toDateString(),
            'durasi' => 7,
            'status_peminjaman' => 'pending',
            'status_pengembalian' => 'belum melakukan pengembalian',
        ]);

        return redirect('/peminjaman')->with('success', 'Peminjaman berhasil disimpan');
    }

   // Konfirmasi pengembalian buku
public function kembalikan(Request $request, $id)
{
    $peminjaman = Peminjaman::where('id', $id)
        ->where('user_id', Auth::id())
        ->firstOrFail();

    // Periksa apakah peminjaman sudah disetujui
    if ($peminjaman->status_peminjaman !== 'disetujui') {
        return redirect()->back()->withErrors([
            'status_peminjaman' => 'Peminjaman belum disetujui oleh admin.'
        ]);
    }

    // Mengubah status pengembalian menjadi pending
    $peminjaman->status_pengembalian = 'pending';
    $peminjaman->save(); // Simpan perubahan status pengembalian

    // Pengembalian sukses
    return redirect()->back()->with('success', 'Pengembalian sedang menunggu persetujuan admin.');
}


    public function perpanjang($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->durasi += 7;
        $tanggalPinjam = new \Carbon\Carbon($peminjaman->tanggal_pinjam);
        $tanggalKembaliBaru = $tanggalPinjam->addDays($peminjaman->durasi);
        $peminjaman->tanggal_kembali = $tanggalKembaliBaru;
        $peminjaman->save();
        return redirect()->back()->with('success', 'Peminjaman diperpanjang 7 hari. Tanggal pengembalian diperbarui.');
    }


   // Halaman transaksi admin
   public function adminTransaksi(Request $request)
   {
       // Ambil input search (jika ada)
       $search = $request->input('search', '');

       // Ambil semua peminjaman yang status peminjamannya pending dengan search dan pagination
       $peminjamans = Peminjaman::with('book')
           ->where('status_peminjaman', 'pending')
           ->when($search, function ($query, $search) {
               return $query->where('nama', 'like', "%{$search}%")
                            ->orWhereHas('book', function($q) use ($search) {
                                $q->where('title', 'like', "%{$search}%");
                            });
           })
           ->paginate(10);  // Menggunakan pagination, 10 item per halaman

       // Ambil semua pengembalian yang status pengembaliannya pending dengan search dan pagination
       $pengembalians = Peminjaman::with('book')
           ->whereNotNull('tanggal_kembali')
           ->where('status_pengembalian', 'pending')
           ->when($search, function ($query, $search) {
               return $query->where('nama', 'like', "%{$search}%")
                            ->orWhereHas('book', function($q) use ($search) {
                                $q->where('title', 'like', "%{$search}%");
                            });
           })
           ->paginate(10);  // Menggunakan pagination, 10 item per halaman

       // Kirim data ke view Inertia
       return Inertia::render('admin/TransactionAdmin', [
           'peminjamans' => $peminjamans,  // Kirim data peminjaman dengan pagination
           'pengembalians' => $pengembalians,  // Kirim data pengembalian dengan pagination
           'search' => $search,  // Menyertakan query pencarian
       ]);
   }

    // Menyetujui peminjaman oleh admin
    public function setujuiPeminjaman($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->status_peminjaman = 'disetujui';

        if ($peminjaman->status_pengembalian === null) {
            $peminjaman->status_pengembalian = 'belum melakukan pengembalian';
        }

        $peminjaman->save();

        return redirect()->back()->with('success', 'Peminjaman disetujui.');
    }

    // Menolak peminjaman oleh admin
    public function tolakPeminjaman($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->book->increment('stock');
        $peminjaman->status_peminjaman = 'ditolak';
        $peminjaman->save();

        return redirect()->back()->with('success', 'Peminjaman ditolak. Stok buku dikembalikan.');
    }

    // Menyetujui pengembalian buku oleh admin
    public function setujuiPengembalian($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);

        if ($peminjaman->status_peminjaman !== 'disetujui') {
            return redirect()->back()->withErrors([
                'status_peminjaman' => 'Peminjaman belum disetujui oleh admin.'
            ]);
        }

        $peminjaman->status_pengembalian = 'disetujui';
        $peminjaman->save();

        // Update stok buku
        $book = $peminjaman->book;
        $book->increment('stock');
        $book->save();

        return redirect()->back()->with('success', 'Pengembalian disetujui dan stok buku diperbarui.');
    }

    // Menolak pengembalian buku oleh admin
    public function tolakPengembalian($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->status_pengembalian = 'ditolak';
        $peminjaman->book->increment('stock');
        $peminjaman->save();

        return redirect()->back()->with('success', 'Pengembalian ditolak. Stok buku dikembalikan.');
    }

    public function adminCreate(Request $request)
    {
        $rules = [
            'nama' => 'required|string|max:255',
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'tanggal_pinjam' => 'required|date',
        ];

        if (Auth::user()->role != 'guru') {
            $rules['kelas'] = 'required|string|max:255';
        }

        $validated = $request->validate($rules);
        $book = Book::findOrFail($validated['book_id']);

        if ($book->stock <= 0) {
            return back()->withErrors(['book_id' => 'Stok buku habis']);
        }

        $book->decrement('stock');
        $tanggalPinjam = new \Carbon\Carbon($validated['tanggal_pinjam']);
        $tanggalKembali = $tanggalPinjam->addDays(7);

        Peminjaman::create([
            'user_id' => $validated['user_id'],
            'nama' => $validated['nama'],
            'kelas' => isset($validated['kelas']) ? $validated['kelas'] : null,
            'book_id' => $validated['book_id'],
            'tanggal_pinjam' => $validated['tanggal_pinjam'],
            'tanggal_kembali' => $tanggalKembali->toDateString(),
            'durasi' => 7,
            'status_peminjaman' => 'pending',  // Menunggu konfirmasi admin
            'status_pengembalian' => 'belum melakukan pengembalian',  // Status awal pengembalian
        ]);

        return redirect()->route('admin.peminjaman.create')->with('success', 'Peminjaman berhasil dibuat');
    }


public function adminCreateForm()
{
    $books = Book::all(); // atau Book::where('stock', '>', 0)->get();
    $users = User::all(); // atau filter sesuai kebutuhan

    return Inertia::render('admin/PeminjamanFormAdmin', [
        'books' => $books,
        'users' => $users,
    ]);
}

public function adminCreatePengembalianForm()
{
    $peminjamans = Peminjaman::with('book')
        ->where('status_pengembalian', 'belum melakukan pengembalian')
        ->get();

    return Inertia::render('admin/PengembalianFormAdmin', [
        'peminjamans' => $peminjamans,
    ]);
}

}
