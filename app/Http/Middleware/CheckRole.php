<?php

// app/Http/Middleware/CheckRole.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles
     * @return \Illuminate\Http\Response
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // Pastikan user sudah login
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login untuk mengakses halaman ini.');
        }

        // Ambil role user yang sedang login
        $userRole = Auth::user()->role;

        // Pastikan role user ada dalam daftar role yang diperbolehkan
        if (!in_array(strtolower($userRole), array_map('strtolower', $roles))) {
            // Jika role user tidak ada dalam daftar, tampilkan error 403
            abort(403, 'Anda tidak memiliki akses ke halaman ini.');
        }

        // Lanjutkan request ke middleware selanjutnya
        return $next($request);
    }
}
