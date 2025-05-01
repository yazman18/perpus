<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\User;
use Illuminate\Validation\Rules\Password as PasswordRule;

class ForgotPasswordController extends Controller
{
    /**
     * Show the form to enter email (Forgot password step 1).
     */
    public function show()
    {
        return inertia('auth/ForgotPassword'); // Inertia view for email input
    }

    /**
     * Handle sending reset password link (we won't actually send email in this case).
     */
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email', // Email should exist in database
        ]);

        // Email exists, redirect to reset password form
        return inertia('auth/ResetPassword', ['email' => $request->email]);
    }

    /**
     * Show the form to reset the password (Forgot password step 2).
     */
    public function showResetForm($email)
    {
        return inertia('auth/ResetPassword', ['email' => $email]);
    }

    /**
     * Handle password reset (reset password after email is validated).
     */
    public function reset(Request $request, $email)
    {
        $request->validate([
            'password' => ['required', 'confirmed', PasswordRule::min(6)], // Validate password
        ]);

        // Find the user by email
        $user = User::where('email', $email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Email not found']);
        }

        // Update the password
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // Redirect to login page
        return redirect('/login')->with('success', 'Password has been reset. Please login.');
    }
}
