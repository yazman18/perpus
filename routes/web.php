<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckRole;

use App\Http\Controllers\ForgotPasswordController;
use Inertia\Inertia;

// MAIN LAYOUT
Route::get('/', fn () => Inertia::render('HomePage'));
Route::get('/news', fn () => Inertia::render('News'));
Route::get('/katalog', fn () => Inertia::render('KatalogPage'));





Route::post('/news', [NewsController::class, 'store'])->name('news.store');
// Menampilkan semua berita
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
// Menampilkan 1 berita
Route::get('/news/{id}', [NewsController::class, 'show'])->name('news.show');

Route::get('/books', [BookController::class, 'index']);
Route::post('/books', [BookController::class, 'store']);
Route::post('/books/{book}', [BookController::class, 'update']);
Route::delete('/books/{book}', [BookController::class, 'destroy']);
Route::get('/books/top-picks', [BookController::class, 'topPicks']);
Route::get('/katalog', [BookController::class, 'katalog']);
Route::get('/books/{book}', [BookController::class, 'show']);
Route::get('/book/{id}', function ($id) {
    $book = \App\Models\Book::findOrFail($id);
    return Inertia::render('BookDetail', ['book' => $book]);
});


Route::get('/register', [AuthController::class, 'showRegisterForm']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login'); // ⬅️ Tambahkan ini
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');



Route::get('/forgot-password', [ForgotPasswordController::class, 'show'])->name('password.request');
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink'])->name('password.email');
Route::get('/reset-password/{token}', function (string $token) {
    return Inertia::render('auth/ResetPassword', [
        'token' => $token,
        'email' => request()->query('email'),
    ]);
})->name('password.reset');
Route::post('/reset-password', [ForgotPasswordController::class, 'reset'])->name('password.update');

Route::get('/profile', fn () => Inertia::render('auth/Profile'));



Route::middleware(['auth', CheckRole::class . ':guru,siswa'])->group(function () {
    Route::get('/peminjaman', fn () => Inertia::render('PeminjamanPage'));
    Route::get('/pengembalian', fn () => Inertia::render('PengembalianPage'));
});

Route::get('/login-admin', [AuthController::class, 'showLoginFormAdmin'])->name('login-admin');
Route::post('/login-admin', [AuthController::class, 'loginAdmin']);
Route::post('/logout-admin', [AuthController::class, 'logoutAdmin'])->middleware('auth')->name('logout-admin');

Route::middleware(['auth', CheckRole::class . ':admin'])->group(function () {
    // ADMIN LAYOUT
    Route::get('/admin', fn () => Inertia::render('admin/HomeAdmin'));
    Route::get('/addbook', fn () => Inertia::render('admin/Addbook'));
    Route::get('/reports', fn () => Inertia::render('admin/ReportAdmin'));
    Route::get('/transaction', fn () => Inertia::render('admin/TransactionAdmin'));
    Route::get('/users', fn () => Inertia::render('admin/Admin'));
    Route::get('/addnews', fn () => Inertia::render('admin/AddNews'));
});