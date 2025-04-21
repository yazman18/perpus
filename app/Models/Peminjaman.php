<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table = 'peminjamans'; // ✅ WAJIB agar tidak fallback ke `peminjamen`

    protected $fillable = [
        'user_id',
        'nama',
        'kelas',
        'book_id',
        'tanggal_pinjam',
        'tanggal_kembali',
        'durasi',
        'status_admin',
    ];

    protected $attributes = [
        'status_peminjaman' => 'pending',
        'status_pengembalian' => 'pending',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}