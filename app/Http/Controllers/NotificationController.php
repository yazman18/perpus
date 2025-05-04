<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function markAsRead($id)
    {
        $notification = Notification::find($id);

        // Pastikan notifikasi ditemukan
        if ($notification) {
            $notification->read = true;
            $notification->save();  // Simpan perubahan status

            // Kirim pesan sukses dengan status 200
            return response()->json(['message' => 'Notifikasi berhasil diperbarui', 'status' => 'success']);
        }

        // Jika tidak ditemukan, kirim pesan error
        return response()->json(['message' => 'Notifikasi tidak ditemukan', 'status' => 'error'], 404);
    }
}
