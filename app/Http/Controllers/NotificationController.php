<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class NotificationController extends Controller
{
    public function markAsRead($id)
{
    $notification = Notification::find($id);

    if ($notification) {
        $notification->read = true;
        $notification->save();

        // Flash message ke Inertia
        Session::flash('flash', ['type' => 'success', 'message' => 'Notifikasi berhasil ditandai sebagai dibaca.']);
        return back(); // redirect ke halaman sebelumnya
    }

    Session::flash('flash', ['type' => 'error', 'message' => 'Notifikasi tidak ditemukan.']);
    return back();
}

}
