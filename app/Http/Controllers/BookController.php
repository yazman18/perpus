<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\About;
use Inertia\Inertia;

class BookController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'uniqueId' => 'required|integer|unique:books,uniqueId',
            'title' => 'required|string|max:255',
            'author' => 'required|string',
            'publisher' => 'nullable|string',
            'year' => 'nullable|integer',
            'isbn' => 'nullable|string',
            'pages' => 'nullable|integer',
            'stock' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ], [
            'uniqueId.unique' => 'ID tersebut sudah digunakan oleh buku lain.',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('books', 'public');
        }
       
        Book::create($validated);

        return redirect()->back()->with('success', 'Buku berhasil disimpan!');
    }

    // Method untuk mencari dan paginate buku
    public function index(Request $request)
    {
        $search = $request->query('search'); // Ambil query pencarian dari input

        // Query untuk mencari buku dengan pagination
        $books = Book::query()
            ->when($search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                             ->orWhere('author', 'like', "%{$search}%")
                            ->orWhere('isbn', 'like', "%{$search}%")
                            ->orWhere('publisher', 'like', "%{$search}%")
                            ->orWhere('year', 'like', "%{$search}%")
;
            })
            ->orderBy('uniqueId', 'asc')
            ->paginate(10); // Pagination, 10 buku per halaman

        return response()->json($books);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
    'uniqueId' => 'required|integer|unique:books,uniqueId,' . $book->id,
            'title' => 'required|string|max:255',
            'author' => 'required|string',
            'publisher' => 'nullable|string',
            'year' => 'nullable|integer',
            'isbn' => 'nullable|string',
            'pages' => 'nullable|integer',
            'stock' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ], [
            'uniqueId.unique' => 'ID tersebut sudah digunakan oleh buku lain.',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('books', 'public');
        }

        $book->update($validated);

        return redirect()->back()->with('success', 'Buku berhasil diedit!');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->back()->with('success', 'Buku berhasil dihapus');
    }

    public function topPicks()
    {
        $books = Book::latest()->take(5)->get();
        return response()->json($books);
    }

    public function katalog()
    {
        $books = Book::latest()->get();
        $aboutData = About::latest()->first(); // Ambil data terbaru dari tabel about
        return Inertia::render('KatalogPage', [
            'books' => $books,
            'aboutData' => $aboutData,
        ]);
    }

    public function show(Book $book)
    {
        $aboutData = About::latest()->first(); // Ambil data terbaru dari tabel about
        return Inertia::render('BookDetail', [
            'book' => $book,
            'aboutData' => $aboutData,
        ]);
    }

    public function adminIndex(Request $request)
    {
        // Ambil query pencarian dari input
        $search = $request->query('search');

        // Query untuk mencari buku dengan pagination
        $books = Book::query()
            ->when($search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                            ->orWhere('author', 'like', "%{$search}%")
                            ->orWhere('uniqueId', 'like', "%{$search}%");
            })
            ->paginate(10); // Pagination, 10 buku per halaman

        return response()->json($books); // Mengembalikan data buku dengan pagination
    }
}