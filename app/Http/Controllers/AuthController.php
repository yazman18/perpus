<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function showRegisterForm()
    {
        return inertia('auth/RegisterPage');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'           => ['required', 'string', 'max:255'],
            'alamat'         => ['required', 'string'],
            'tanggal_lahir'  => ['required', 'date'],
            'email'          => ['required', 'email', 'unique:users,email'],
            'password'       => ['required', Password::min(6)],
            'id_number'      => ['required', 'string'],
            'role'           => ['required', 'in:siswa,guru'],
        ]);

        User::create([
            'name'           => $validated['name'],
            'alamat'         => $validated['alamat'],
            'tanggal_lahir'  => $validated['tanggal_lahir'],
            'email'          => $validated['email'],
            'password'       => Hash::make($validated['password']),
            'id_number'      => $validated['id_number'],
            'role'           => $validated['role'],
        ]);

        return redirect('/login')->with('success', 'Akun berhasil dibuat. Silakan login.');
    }

    public function showLoginForm()
    {
        return inertia('auth/LoginPage');
    }

    public function login(Request $request)
{
    $credentials = $request->validate([
        'identifier' => ['required', 'string'],
        'password'   => ['required', 'string'],
        'role'       => ['required', 'in:siswa,guru'],
    ]);

    // Coba cari user berdasarkan email atau id_number
    $user = User::where(function ($query) use ($credentials) {
        $query->where('email', $credentials['identifier'])
              ->orWhere('id_number', $credentials['identifier']);
    })->where('role', $credentials['role'])->first();

    // ✅ Jika user tidak ditemukan
    if (!$user) {
        return back()->withErrors([
            'message' => 'Pengguna tidak ditemukan.',
        ]);
    }

    // ✅ Jika password salah
    if (!Hash::check($credentials['password'], $user->password)) {
        return back()->withErrors([
            'message' => 'Password salah.',
        ]);
    }

    // ✅ Jika valid, login
    Auth::login($user);
    $request->session()->regenerate();

    return redirect()->intended('/')->with('success', 'Berhasil login. Selamat datang!');

}


    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }

    public function showLoginFormAdmin()
{
    return Inertia::render('admin/LoginAdmin'); // ← sesuai path di Pages/Admin/LoginAdmin.jsx
}

public function loginAdmin(Request $request)
{
    $credentials = $request->validate([
        'identifier' => ['required', 'string'],
        'password'   => ['required', 'string'],
        'role'       => ['required', 'in:admin'],
    ]);

    $user = \App\Models\User::where('email', $credentials['identifier'])
                ->where('role', 'admin')
                ->first();

    if (!$user) {
        return back()->withErrors(['message' => 'Akun admin tidak ditemukan.']);
    }

    if (!Hash::check($credentials['password'], $user->password)) {
        return back()->withErrors(['message' => 'Password salah.']);
    }

    Auth::login($user);
    $request->session()->regenerate();

    return redirect()->intended('/admin')->with('success', 'Berhasil login sebagai admin.');
}

public function logoutAdmin(Request $request)
{
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect()->route('login-admin');
}

}
