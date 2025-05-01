<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Show the change password form.
     */
    public function showChangePasswordForm()
    {
        return inertia('auth/ChangePassword');  // Render change password page
    }

    /**
     * Handle the password change request.
     */
    public function changePassword(Request $request)
    {
        // Validasi input
        $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'confirmed', 'min:8'], // minimal 8 karakter
        ]);

        // Ambil user yang sedang login
        $user = Auth::user();

        // Cek apakah password lama benar
        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors(['current_password' => 'The current password is incorrect.']);
        }

        // Perbarui password
        $user->password = Hash::make($request->password);  // Enkripsi password baru
        $user->save();  // Menyimpan perubahan password ke database

        // Redirect dengan pesan sukses
        return redirect('/profile')->with('success', 'Password successfully updated.');
    }



}
