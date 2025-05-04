<?php

// App\Providers\AppServiceProvider.php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Bagikan notifikasi ke seluruh halaman yang menggunakan Inertia
        Inertia::share([
            'notifications' => function () {
                // Pastikan hanya admin yang bisa mendapatkan notifikasi
                if (Auth::check() && Auth::user()->role == 'admin') {
                    return Notification::where('user_id', Auth::id())->get();
                }

                return []; // Kembalikan array kosong jika bukan admin
            },
        ]);
    }

    public function register()
    {
        //
    }
}