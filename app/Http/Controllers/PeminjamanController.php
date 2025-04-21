<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PeminjamanController extends Controller
{
    /**
     * Menampilkan halaman peminjaman dengan data buku dan peminjaman user login.
     */
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
                        'image' => $p->book->image,
                    ],
                ];
            });

        $books = Book::all();

        return Inertia::render('PeminjamanPage', [
            'peminjamans' => $peminjamans,
            'books' => $books,
        ]);
    }

    /**
     * Menyimpan data peminjaman buku baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'book_id' => 'required|exists:books,id',
            'tanggal_pinjam' => 'required|date',
        ]);

        $book = Book::find($validated['book_id']);
        if ($book->stock <= 0) {
            return back()->withErrors(['book_id' => 'Stok buku habis']);
        }

        $book->decrement('stock');

        Peminjaman::create([
            'user_id' => Auth::id(),
            'nama' => $validated['nama'],
            'kelas' => $validated['kelas'],
            'book_id' => $validated['book_id'],
            'tanggal_pinjam' => $validated['tanggal_pinjam'],
            'durasi' => 7, // assuming 7 days by default
        ]);

        return redirect('/peminjaman')->with('success', 'Peminjaman berhasil disimpan');
    }

    public function pengembalianPage()
    {
        $pengembalians = Peminjaman::with('book')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('PengembalianPage', [
            'pengembalians' => $pengembalians
        ]);
    }

    public function kembalikan($id)
    {
        $peminjaman = Peminjaman::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $today = now();

        // ✅ Validasi: tanggal kembali tidak boleh sebelum tanggal pinjam
        if ($today->lt($peminjaman->tanggal_pinjam)) {
            return redirect()->back()->withErrors([
                'tanggal_kembali' => 'Tanggal pengembalian tidak valid (lebih awal dari tanggal pinjam).'
            ]);
        }

        // Tambahkan stok buku
        $peminjaman->book->increment('stock');

        $peminjaman->tanggal_kembali = $today;
        $peminjaman->save();

        return redirect()->back()->with('success', 'Buku berhasil dikembalikan.');
    }

    public function perpanjang($id)
    {
        $peminjaman = Peminjaman::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $peminjaman->durasi += 7;
        $peminjaman->save();

        return redirect()->back()->with('success', 'Peminjaman diperpanjang 7 hari.');
    }

    /**
     * Admin Transaction Page: Shows pending reservations and returns
     */
    public function adminTransaksi()
    {
        $peminjamans = Peminjaman::with('book')
            ->where('status_peminjaman', 'pending')
            ->latest()
            ->get();

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

    /**
     * Approve a borrowing request (approve)
     */
    public function setujuiPeminjaman($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->status_peminjaman = 'disetujui';
        $peminjaman->save();

        return redirect()->back()->with('success', 'Peminjaman disetujui.');
    }

    /**
     * Reject a borrowing request (reject)
     * Return the book stock to the original value
     */
    public function tolakPeminjaman($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $book = $peminjaman->book;

        // Restoring stock to the book if the reservation is rejected
        $book->increment('stock');

        $peminjaman->status_peminjaman = 'ditolak';
        $peminjaman->save();

        return redirect()->back()->with('success', 'Peminjaman ditolak. Stok buku dikembalikan.');
    }

    /**
     * Approve a return request (approve return)
     */
    public function setujuiPengembalian($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->status_pengembalian = 'disetujui';
        $peminjaman->save();

        return redirect()->back()->with('success', 'Pengembalian disetujui.');
    }

    /**
     * Reject a return request (reject)
     */
    public function tolakPengembalian($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->status_pengembalian = 'ditolak';
        $peminjaman->save();

        return redirect()->back()->with('success', 'Pengembalian ditolak.');
    }
}
