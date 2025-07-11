<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $table = 'about'; // jika nama tabel tidak pakai bentuk jamak
    protected $fillable = [
        'nama_sekolah',
        'judul',
        'sub_judul',
        'about',
        'deskripsi',
        'alamat',
        'no_hp',
        'website',
        'email',
        'instagram',
        'jam_operasional_1',
        'jam_operasional_2',
        'maps',
        'logo_sekolah',
        'gambar',
        'gambar_struktur',
        'barcode',
        'copyright',
    ];
}
