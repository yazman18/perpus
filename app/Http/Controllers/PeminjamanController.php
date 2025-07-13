<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\Notification;
use App\Models\About;
class PeminjamanController extends Controller
{
    public function index()
    {
        $aboutData = About::latest()->first(); // Ambil data terbaru dari tabel about

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
                    'tanggal_pengembalian' => $p->tanggal_pengembalian,
                    'book' => [
                        'title' => $p->book->title,
                        'author' => $p->book->author,
                        'image' => $p->book->image,
                    ],
                ];
            });

        return Inertia::render('PeminjamanPage', [
            'peminjamans' => $peminjamans,
            'aboutData' => $aboutData,
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
        // $book->decrement('stock');
        // $book->increment('stock_inLoan'); // Increment stock_inLoan when a book is borrowed

        $tanggalPinjam = new \Carbon\Carbon($validated['tanggal_pinjam']);
        $tanggalKembali = $tanggalPinjam->addDays(7);
        // $tanggalPinjam = Carbon::parse($peminjaman->tanggal_pinjam);
        // $tanggalPengembalian = Carbon::now();

        // $durasiPinjam = $tanggalPinjam->diffInDays($tanggalPengembalian);
        // $telat = max(0, $durasiPinjam - $peminjaman->durasi);
        // $dendaPerHari = 1000;
        // $denda = $telat * $dendaPerHari;
        // $peminjaman->tanggal_pengembalian = $tanggalPengembalian->toDateString();
        // $peminjaman->denda = $denda; 
       
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
            // 'tanggal_pengembalian' => 
        ]);

        // Menambahkan notifikasi ke session (untuk admin)
        Notification::create([
            'user_id' => 1,  // Admin yang menerima notifikasi
            'message' => 'Ada peminjaman buku baru dari ' . $validated['nama'] . ' yang perlu disetujui.',
            'read' => false,  // Notifikasi belum dibaca
        ]);

        return redirect('/peminjaman')->with('success', 'Peminjaman berhasil disimpan');
    }

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
        $peminjaman->tanggal_pengembalian = Carbon::now()->toDateString();

        $peminjaman->save(); // Simpan perubahan status pengembalian

        // Menambahkan notifikasi ke session (untuk admin)
        session()->push('notifications'. Auth::id(), [
            'message' => 'Pengembalian buku oleh ' . $peminjaman->nama . ' sedang menunggu persetujuan admin.',
            'read' => false,
        ]);

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
        // Ambil data terbaru dari tabel about
        $aboutData = About::latest()->first();

        // Ambil input pencarian (jika ada)
        $search = $request->input('search', '');

        // Ambil semua data peminjaman dengan status "pending", dengan relasi ke buku, filter pencarian, dan pagination
        $peminjamans = Peminjaman::with('book')
            ->where('status_peminjaman', 'pending')
            ->when($search, function ($query, $search) {
                return $query->where('nama', 'like', "%{$search}%")
                            ->orWhereHas('book', function ($q) use ($search) {
                                $q->where('title', 'like', "%{$search}%");
                            });
            })
            ->paginate(10);

        // Ambil semua data pengembalian yang sudah dikembalikan tapi status pengembaliannya masih "pending"
            $pengembalians = Peminjaman::with('book')
            ->whereNotNull('tanggal_kembali')
            ->where('status_pengembalian', 'pending')
            ->when($search, function ($query, $search) {
                return $query->where('nama', 'like', "%{$search}%")
                            ->orWhereHas('book', function ($q) use ($search) {
                                $q->where('title', 'like', "%{$search}%");
                            });
            })
            ->paginate(10);

        // Ambil notifikasi user admin (sementara user_id = 1)
        $notifications = Notification::where('user_id', 1)->get();

        // Kirim data ke komponen Inertia
        return Inertia::render('admin/TransactionAdmin', [
            'peminjamans' => $peminjamans,
            'pengembalians' => $pengembalians,
            'search' => $search,
            'notifications' => $notifications,
            'aboutData' => $aboutData,
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
        $book = $peminjaman->book;
        $book->decrement('stock');
        $book->increment('stock_inLoan'); // Increment stock_inLoan when a book is borrowed

        $peminjaman->save();

        return redirect()->back()->with('success', 'Peminjaman disetujui.');
    }

    // Menolak peminjaman oleh admin
    public function tolakPeminjaman($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->book->increment('stock');
        $peminjaman->book->decrement('stock_inLoan'); // Decrement stock_inLoan when a book is rejected
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

        $tanggalPinjam = Carbon::parse($peminjaman->tanggal_pinjam)->startOfDay();
        $tanggalKembali = Carbon::now()->startOfDay();
        $batasPengembalian = $tanggalPinjam->copy()->addDays($peminjaman->durasi)->startOfDay();

        $telat = $tanggalKembali->gt($batasPengembalian)
            ? $batasPengembalian->diffInDays($tanggalKembali)
            : 0;

        $dendaPerHari = 1000;
        $denda = $telat * $dendaPerHari;


        $peminjaman->status_pengembalian = 'disetujui';
        $peminjaman->tanggal_pengembalian = $tanggalKembali->toDateString();
        $peminjaman->denda = $denda; // simpan denda di DB
        $peminjaman->save();

        // Update stok buku
        $book = $peminjaman->book;
        $book->increment('stock');
        $book->decrement('stock_inLoan');
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
        $book->increment('stock_inLoan'); // Increment stock_inLoan when a book is borrowed
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

        return redirect()->route('admin.peminjaman.createForm')->with('success', 'Peminjaman berhasil dibuat');
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
    // Exclude rejected borrowings when fetching borrowings for return
    $peminjamans = Peminjaman::with('book')
        ->where('status_pengembalian', 'belum melakukan pengembalian')
        ->where('status_peminjaman', '!=', 'ditolak') // Exclude rejected borrowings
        ->get();

    return Inertia::render('admin/PengembalianFormAdmin', [
        'peminjamans' => $peminjamans,
    ]);
}

}
