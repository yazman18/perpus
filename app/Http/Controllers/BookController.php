<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Session;
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

        public function index()
    {
        $books = Book::latest()->get();
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

        // Return ke inertia dengan flash book
        return redirect()->back()->with('success', 'Buku berhasil diedit!');
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(['message' => 'Buku berhasil dihapus']);
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


}