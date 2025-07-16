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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->string('cover')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('content'); // isi rich text dari ReactQuill
            $table->timestamps();
        });

        DB::table('news')->insert([
            [
                'title' => 'Teknologi AI Meningkatkan Produktivitas Industri',
                'category' => 'Teknologi',
                'cover' => 'covers/cover.jpg',
                'short_description' => 'Peran AI dalam industri manufaktur meningkat pesat.',
                'content' => 'Kecerdasan buatan kini digunakan untuk meningkatkan efisiensi dan akurasi dalam proses produksi di berbagai sektor industri.',
            ],
            [
                'title' => 'Pendidikan Online Menjadi Tren Baru',
                'category' => 'Pendidikan',
                'cover' => 'covers/cover.jpg',
                'short_description' => 'Pembelajaran daring kini menjadi pilihan utama.',
                'content' => 'Dengan kemajuan teknologi, banyak lembaga pendidikan beralih ke sistem pembelajaran online untuk menjangkau lebih banyak siswa.',
            ],
            [
                'title' => 'Pemerintah Luncurkan Program Ramah Lingkungan',
                'category' => 'Lingkungan',
                'cover' => 'covers/cover.jpg',
                'short_description' => 'Inisiatif baru untuk mengurangi emisi karbon.',
                'content' => 'Program ini bertujuan mengedukasi masyarakat tentang pentingnya menjaga lingkungan dan mengurangi penggunaan plastik sekali pakai.',
            ],
            [
                'title' => 'Startup Lokal Tembus Pasar Internasional',
                'category' => 'Bisnis',
                'cover' => 'covers/cover.jpg',
                'short_description' => 'Inovasi anak bangsa diapresiasi global.',
                'content' => 'Salah satu startup teknologi asal Indonesia berhasil mendapatkan pendanaan dan ekspansi ke Asia Tenggara.',
            ],
            [
                'title' => 'Tips Menjaga Kesehatan Mental di Era Digital',
                'category' => 'Kesehatan',
                'cover' => 'covers/cover.jpg',
                'short_description' => 'Kesehatan mental penting di tengah arus informasi cepat.',
                'content' => 'Masyarakat diimbau menjaga keseimbangan antara kehidupan nyata dan aktivitas digital.',
            ],
            [
                'title' => 'Festival Musik Indonesia Kembali Digelar',
                'category' => 'Hiburan',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Acara tahunan musik terbesar hadir lagi tahun ini.',
                'content' => 'Festival ini akan menampilkan musisi ternama serta bakat baru dari seluruh penjuru Indonesia.',
            ],
            [
                'title' => 'Penemuan Arkeologi di Jawa Timur',
                'category' => 'Sains',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Situs bersejarah ditemukan oleh tim peneliti lokal.',
                'content' => 'Penemuan ini menambah bukti sejarah panjang peradaban di wilayah Nusantara.',
            ],
            [
                'title' => 'Ekonomi Digital Tumbuh Pesat di Asia Tenggara',
                'category' => 'Ekonomi',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Pertumbuhan e-commerce dan fintech meningkat tajam.',
                'content' => 'Laporan terbaru menunjukkan bahwa ekonomi digital menjadi pendorong utama pemulihan ekonomi pasca pandemi.',
            ],
            [
                'title' => 'Desain Interior Minimalis Semakin Digemari',
                'category' => 'Lifestyle',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Gaya hidup simpel mendominasi pilihan masyarakat urban.',
                'content' => 'Interior minimalis dianggap efisien dan estetik untuk ruang modern.',
            ],
            [
                'title' => 'Kampanye Literasi Digital untuk Remaja',
                'category' => 'Sosial',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Meningkatkan kesadaran remaja dalam menggunakan internet secara bijak.',
                'content' => 'Kampanye ini dilakukan melalui media sosial, webinar, dan kerjasama dengan sekolah-sekolah.',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};