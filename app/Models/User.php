<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable; // ✅ Tambahkan ini

class User extends Authenticatable
{
    use HasFactory, Notifiable; // ✅ Tambahkan Notifiable di sini

    protected $fillable = [
        'name',
        'alamat',
        'tanggal_lahir',
        'email',
        'password',
        'id_number',
        'role',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'password' => 'hashed',
    ];
}