<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Inertia\Inertia;

class BookController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string',
            'publisher' => 'nullable|string',
            'year' => 'nullable|integer',
            'isbn' => 'nullable|string',
            'pages' => 'nullable|integer',
            'language' => 'nullable|string',
            'stock' => 'nullable|integer',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
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
                             ->orWhere('author', 'like', "%{$search}%");
            })
            ->paginate(10); // Pagination, 10 buku per halaman

        return response()->json($books);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string',
            'publisher' => 'nullable|string',
            'year' => 'nullable|integer',
            'isbn' => 'nullable|string',
            'pages' => 'nullable|integer',
            'language' => 'nullable|string',
            'stock' => 'nullable|integer',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
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
        return Inertia::render('KatalogPage', [
            'books' => $books,
        ]);
    }

    public function show(Book $book)
    {
        return Inertia::render('BookDetail', [
            'book' => $book
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
                         ->orWhere('isbn', 'like', "%{$search}%");
        })
        ->paginate(10); // Pagination, 10 buku per halaman

    return response()->json($books); // Mengembalikan data buku dengan pagination
}
}