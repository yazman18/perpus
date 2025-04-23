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
        $books = Book::all();

        return Inertia::render('PeminjamanForm', [
            'book' => $book,
            'user' => $user,
            'books' => $books,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'tanggal_pinjam' => 'required|date',
        ]);

        $book = Book::findOrFail($validated['book_id']);

        if ($book->stock <= 0) {
            return back()->withErrors(['book_id' => 'Stok buku habis']);
        }

        $book->decrement('stock');

        Peminjaman::create([
            'user_id' => $validated['user_id'],
            'nama' => $validated['nama'],
            'kelas' => $validated['kelas'],
            'book_id' => $validated['book_id'],
            'tanggal_pinjam' => $validated['tanggal_pinjam'],
            'durasi' => 7,
            'status_peminjaman' => 'pending',
            'status_pengembalian' => null, // atau tidak diset sama sekali!
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
    // Temukan peminjaman berdasarkan ID
    $peminjaman = Peminjaman::findOrFail($id);

    // Periksa apakah status peminjaman disetujui
    if ($peminjaman->status_peminjaman !== 'disetujui') {
        return redirect()->back()->withErrors([
            'status_peminjaman' => 'Peminjaman belum disetujui oleh admin.'
        ]);
    }

    // Pastikan tanggal pengembalian valid
    $peminjaman->tanggal_kembali = $request->tanggal_kembali;
    $peminjaman->status_pengembalian = 'pending'; // Status pengembalian yang menunggu konfirmasi admin
    $peminjaman->save();

    return redirect()->back()->with('success', 'Pengembalian sedang menunggu persetujuan admin.');
}


    

public function perpanjang($id)
{
    // Mencari peminjaman berdasarkan ID
    $peminjaman = Peminjaman::findOrFail($id);

    // Perpanjang durasi 7 hari
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
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->status_pengembalian = 'disetujui';
        $peminjaman->save();

        return redirect()->back()->with('success', 'Pengembalian disetujui.');
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
