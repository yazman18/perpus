<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\AdminController;

use Inertia\Inertia;

// MAIN LAYOUT
Route::get('/', fn () => Inertia::render('HomePage'));
Route::get('/news', fn () => Inertia::render('News'));
Route::get('/katalog', fn () => Inertia::render('KatalogPage'));
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{id}', [NewsController::class, 'show'])->name('news.show');
Route::get('/', [NewsController::class, 'indexHome'])->name('HomePage');
Route::get('/books/top-picks', [BookController::class, 'topPicks']);
Route::get('/books', [BookController::class, 'index']);
Route::get('/katalog', [BookController::class, 'katalog']);
Route::get('/books/{book}', [BookController::class, 'show']);
Route::get('/book/{id}', function ($id) {
    $book = \App\Models\Book::findOrFail($id);
    return Inertia::render('BookDetail', ['book' => $book]);
});


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
Route::get('/register', [AuthController::class, 'showRegisterForm']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login'); // ⬅️ Tambahkan ini
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');
Route::get('/login-admin', [AuthController::class, 'showLoginFormAdmin'])->name('login-admin');
Route::post('/login-admin', [AuthController::class, 'loginAdmin']);
Route::post('/logout-admin', [AuthController::class, 'logoutAdmin'])->middleware('auth')->name('logout-admin');

Route::middleware(['auth', CheckRole::class . ':guru,siswa'])->group(function () {
    Route::get('/peminjaman', [PeminjamanController::class, 'index'])->name('peminjaman.index');
    Route::post('/pengembalian/{id}/kembalikan', [PeminjamanController::class, 'kembalikan'])->name('pengembalian.kembalikan');
    Route::post('/peminjaman/perpanjang/{id}', [PeminjamanController::class, 'perpanjang'])->name('peminjaman.perpanjang');
    Route::get('/peminjaman/{book_id}', [PeminjamanController::class, 'create'])->name('peminjaman.create');
    Route::post('/peminjaman', [PeminjamanController::class, 'store'])->name('peminjaman.store');
    Route::post('/peminjaman/{id}/perpanjang', [PeminjamanController::class, 'perpanjang']);
});


Route::middleware(['auth', CheckRole::class . ':admin'])->group(function () {
    Route::post('/books', [BookController::class, 'store']);
    Route::post('/books/{book}', [BookController::class, 'update']);
    Route::delete('/books/{book}', [BookController::class, 'destroy']);
});

Route::middleware(['auth', CheckRole::class . ':admin'])->group(function () {
    Route::post('/news', [NewsController::class, 'store'])->name('news.store');
    Route::get('/admin/add-news', [NewsController::class, 'create'])->name('news.create');
    Route::get('/admin/news', [NewsController::class, 'indexAdmin'])->name('news.index');
    Route::get('/news/edit/{id}', [NewsController::class, 'edit'])->name('news.edit');
    Route::delete('/news/{id}', [NewsController::class, 'destroy'])->name('news.destroy');
    Route::post('/news/{id}', [NewsController::class, 'update'])->name('news.update');
});

Route::middleware(['auth', CheckRole::class . ':admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/addbook', fn () => Inertia::render('admin/Addbook'));
    Route::get('/reports', [AdminController::class, 'report'])->name('admin.report');
    Route::get('/transaction', [PeminjamanController::class, 'adminTransaksi']);
    Route::post('/transaksi/{id}/peminjaman/acc', [PeminjamanController::class, 'setujuiPeminjaman']);
    Route::post('/transaksi/{id}/peminjaman/tolak', [PeminjamanController::class, 'tolakPeminjaman']);
    Route::post('/transaksi/{id}/pengembalian/acc', [PeminjamanController::class, 'setujuiPengembalian']);
    Route::post('/transaksi/{id}/pengembalian/tolak', [PeminjamanController::class, 'tolakPengembalian']);
    Route::get('/users', fn () => Inertia::render('admin/Admin'));
    Route::get('/addnews', fn () => Inertia::render('admin/AddNews'));
    Route::get('/management-news', fn () => Inertia::render('admin/ManajemenNews'));
});
