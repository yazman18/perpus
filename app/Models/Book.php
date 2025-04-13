<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'publisher',
        'year',
        'isbn',
        'pages',
        'language',
        'stock',
        'category',
        'description',
        'image',
    ];
}
