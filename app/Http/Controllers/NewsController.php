<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'desc' => 'nullable|string',
            'content' => 'required|string',
            'cover' => 'nullable|image|max:2048',
        ]);

        // Upload file
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public');
        }

        News::create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'short_description' => $validated['desc'],
            'content' => $validated['content'],
            'cover' => $coverPath ?? null,
        ]);

        return redirect()->back()->with('success', 'Berita berhasil ditambahkan!');
    }

    public function index()
    {
        $news = News::latest()->get();

        return Inertia::render('News', [
            'newsList' => $news,
        ]);
    }

    public function show($id)
    {
        $news = News::findOrFail($id);

        return Inertia::render('SinglePostPage', [
            'news' => $news,
        ]);
    }

    // Controller method
    public function indexHome()
    {
        $news = News::latest()->take(4)->get();
        return Inertia::render('HomePage', [
            'news' => $news,
        ]);
    }



}
