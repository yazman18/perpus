<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->integer('uniqueId');
            $table->string('title');
            $table->string('author');
            $table->string('publisher')->nullable();
            $table->year('year')->nullable();
            $table->string('isbn')->nullable();
            $table->integer('pages')->nullable();
            $table->integer('stock')->default(0);
            $table->integer('stock_inLoan')->default(0);
            $table->text('description')->nullable();
            $table->string('image')->nullable(); // cover
            $table->timestamps();
        });

        DB::table('books')->insert([
            [
                'uniqueId' => 1,
                'title' => 'Pemrograman Web dengan Laravel',
                'author' => 'Andi Nugroho',
                'publisher' => 'Informatika Bandung',
                'year' => 2022,
                'isbn' => '9786021234567',
                'pages' => 320,
                'stock' => 12,
                'stock_inLoan' => 3,
                'description' => 'Panduan lengkap membangun aplikasi web menggunakan Laravel versi terbaru.',
                'image' => 'books/book.png',
            ],
            [
                'uniqueId' => 2,
                'title' => 'Dasar-dasar Jaringan Komputer',
                'author' => 'Rina Kartika',
                'publisher' => 'Gramedia',
                'year' => 2020,
                'isbn' => '9786027654321',
                'pages' => 280,
                'stock' => 8,
                'stock_inLoan' => 2,
                'description' => 'Materi dasar tentang konsep jaringan komputer dan implementasinya.',
                'image' => 'books/book.png',
            ],
            [
                'uniqueId' => 3,
                'title' => 'Kecerdasan Buatan dan Machine Learning',
                'author' => 'Budi Santosa',
                'publisher' => 'Elex Media',
                'year' => 2023,
                'isbn' => '9786029999999',
                'pages' => 350,
                'stock' => 10,
                'stock_inLoan' => 5,
                'description' => 'Penjelasan konsep AI, algoritma, dan penerapan machine learning.',
                'image' => 'books/book.png',
            ],
            [
                'uniqueId' => 4,
                'title' => 'Pemrograman Python untuk Pemula',
                'author' => 'Siti Zahra',
                'publisher' => 'Informatika Bandung',
                'year' => 2021,
                'isbn' => '9786021234980',
                'pages' => 240,
                'stock' => 14,
                'stock_inLoan' => 4,
                'description' => 'Belajar Python dari dasar hingga membuat aplikasi sederhana.',
                'image' => 'books/book1.jpg',
            ],
            [
                'uniqueId' => 5,
                'title' => 'Desain UI/UX Modern',
                'author' => 'Rendy Kurniawan',
                'publisher' => 'Media Visual',
                'year' => 2022,
                'isbn' => '9786025432190',
                'pages' => 200,
                'stock' => 6,
                'stock_inLoan' => 1,
                'description' => 'Referensi lengkap desain antarmuka pengguna yang responsif dan menarik.',
                'image' => 'books/book1.jpg',
            ],
            [
                'uniqueId' => 6,
                'title' => 'Sistem Operasi: Teori dan Praktik',
                'author' => 'Dina Arisandi',
                'publisher' => 'Gramedia',
                'year' => 2019,
                'isbn' => '9786021111223',
                'pages' => 400,
                'stock' => 9,
                'stock_inLoan' => 2,
                'description' => 'Pembahasan lengkap tentang sistem operasi Linux dan Windows.',
                'image' => 'books/book1.jpg',
            ],
            [
                'uniqueId' => 7,
                'title' => 'Manajemen Proyek TI',
                'author' => 'Teguh Prasetyo',
                'publisher' => 'Deepublish',
                'year' => 2021,
                'isbn' => '9786025533334',
                'pages' => 270,
                'stock' => 5,
                'stock_inLoan' => 0,
                'description' => 'Dasar-dasar manajemen proyek teknologi informasi dan studi kasus implementasi.',
                'image' => 'books/book2.jpg',
            ],
            [
                'uniqueId' => 8,
                'title' => 'Algoritma dan Struktur Data',
                'author' => 'Lutfi Hidayat',
                'publisher' => 'Erlangga',
                'year' => 2020,
                'isbn' => '9786022233445',
                'pages' => 310,
                'stock' => 11,
                'stock_inLoan' => 6,
                'description' => 'Pembahasan konsep dasar algoritma dan struktur data beserta implementasinya.',
                'image' => 'books/book2.jpg',
            ],
            [
                'uniqueId' => 9,
                'title' => 'Pengantar Basis Data',
                'author' => 'Ayu Meilani',
                'publisher' => 'Andi Publisher',
                'year' => 2018,
                'isbn' => '9786029876543',
                'pages' => 230,
                'stock' => 7,
                'stock_inLoan' => 3,
                'description' => 'Materi pengantar basis data relasional dan SQL.',
                'image' => 'books/book2.jpg',
            ],
            [
                'uniqueId' => 10,
                'title' => 'Keamanan Siber dan Etika TI',
                'author' => 'Fajar Rahman',
                'publisher' => 'Informatika Bandung',
                'year' => 2023,
                'isbn' => '9786028899000',
                'pages' => 260,
                'stock' => 13,
                'stock_inLoan' => 2,
                'description' => 'Pembahasan isu keamanan siber serta pentingnya etika dalam dunia TI.',
                'image' => 'books/book2.jpg',
            ],
        ]);
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
