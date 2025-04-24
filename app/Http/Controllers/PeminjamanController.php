<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
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
        $books = Book::where('stock', '>', 0)->get(); // Only available books
        
        // Admin can choose user
        $users = User::all(); // All users can be selected by admin

        return Inertia::render('PeminjamanForm', [
            'book' => $book,
            'user' => $user,
            'books' => $books,
            'users' => $users,  // Provide users to select
        ]);
    }

    public function store(Request $request)
{
    // Validasi untuk input
    $rules = [
        'nama' => 'required|string|max:255',
        'book_id' => 'required|exists:books,id',
        'user_id' => 'required|exists:users,id',
        'tanggal_pinjam' => 'required|date',
    ];

    // Jika pengguna adalah siswa, kelas wajib diisi
    if (Auth::user()->role != 'guru') {
        $rules['kelas'] = 'required|string|max:255';
    }

    $validated = $request->validate($rules);

    // Ambil data buku berdasarkan book_id
    $book = Book::findOrFail($validated['book_id']);

    if ($book->stock <= 0) {
        return back()->withErrors(['book_id' => 'Stok buku habis']);
    }

    // Kurangi stok buku
    $book->decrement('stock');

    // Simpan peminjaman
    Peminjaman::create([
        'user_id' => $validated['user_id'],
        'nama' => $validated['nama'],
        'kelas' => isset($validated['kelas']) ? $validated['kelas'] : null, // Menyimpan kelas jika ada
        'book_id' => $validated['book_id'],
        'tanggal_pinjam' => $validated['tanggal_pinjam'],
        'durasi' => 7, // Durasi peminjaman default
        'status_peminjaman' => 'pending', // Status menunggu konfirmasi
        'status_pengembalian' => null, // Belum ada pengembalian
    ]);

    return redirect('/peminjaman')->with('success', 'Peminjaman berhasil disimpan');
}



    public function pengembalianPage()
    {
        $pengembalians = Peminjaman::with('book')
            ->where('user_id', Auth::id())
            ->whereNotNull('tanggal_kembali')
            ->latest()
            ->get();

        return Inertia::render('PengembalianPage', [
            'pengembalians' => $pengembalians
        ]);
    }

    public function kembalikan($id, Request $request)
    {
        $peminjaman = Peminjaman::findOrFail($id);

        // Ensure the borrowing status is approved
        if ($peminjaman->status_peminjaman !== 'disetujui') {
            return redirect()->back()->withErrors([
                'status_peminjaman' => 'Peminjaman belum disetujui oleh admin.'
            ]);
        }

        // Validate return date
        $peminjaman->tanggal_kembali = $request->tanggal_kembali;
        $peminjaman->status_pengembalian = 'pending'; // Status awaiting admin approval
        $peminjaman->save();

        return redirect()->back()->with('success', 'Pengembalian sedang menunggu persetujuan admin.');
    }

    public function perpanjang($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);

        // Extend the borrowing period by 7 days
        $peminjaman->durasi += 7;
        $peminjaman->save();

    return redirect()->back()->with('success', 'Peminjaman diperpanjang 7 hari.');
}

    public function adminTransaksi()
    {
        $peminjamans = Peminjaman::with('book')
            ->where('status_peminjaman', 'pending')
            ->latest()
            ->get();
    
        // Data pengembalian hanya muncul jika:
        // - User sudah klik tombol pengembalian
        // - Sudah mengisi tanggal_kembali
        // - status_pengembalian = 'pending'
        $pengembalians = Peminjaman::with('book')
            ->whereNotNull('tanggal_kembali')
            ->where('status_pengembalian', 'pending')
            ->latest()
            ->get();
    
        return Inertia::render('admin/TransactionAdmin', [
            'peminjamans' => $peminjamans,
            'pengembalians' => $pengembalians,
        ]);
    }

    public function setujuiPeminjaman($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->status_peminjaman = 'disetujui';
        $peminjaman->save();

        return redirect()->back()->with('success', 'Peminjaman disetujui.');
    }

    public function tolakPeminjaman($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->book->increment('stock');
        $peminjaman->status_peminjaman = 'ditolak';
        $peminjaman->save();

        return redirect()->back()->with('success', 'Peminjaman ditolak. Stok buku dikembalikan.');
    }

    public function setujuiPengembalian($id)
{
    // Temukan peminjaman berdasarkan ID
    $peminjaman = Peminjaman::findOrFail($id);

    // Periksa jika status peminjaman sudah disetujui
    if ($peminjaman->status_peminjaman !== 'disetujui') {
        return redirect()->back()->withErrors([
            'status_peminjaman' => 'Peminjaman belum disetujui oleh admin.'
        ]);
    }

    // Perbarui status pengembalian menjadi 'disetujui'
    $peminjaman->status_pengembalian = 'disetujui';

    // Tambahkan stok buku yang telah dikembalikan
    $book = $peminjaman->book; // Ambil buku yang dipinjam
    $book->increment('stock'); // Menambah stok buku yang dikembalikan

    // Simpan perubahan
    $peminjaman->save();
    $book->save(); // Simpan perubahan pada buku

    return redirect()->back()->with('success', 'Pengembalian disetujui dan stok buku diperbarui.');
}


    public function tolakPengembalian($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->status_pengembalian = 'ditolak';
        $peminjaman->book->increment('stock');
        $peminjaman->save();

        return redirect()->back()->with('success', 'Pengembalian ditolak. Stok buku dikembalikan.');
    }
}