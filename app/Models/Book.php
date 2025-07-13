<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'uniqueId',
        'title',
        'author',
        'publisher',
        'year',
        'isbn',
        'pages',
        'stock',
        'description',
        'image',
    ];
}
