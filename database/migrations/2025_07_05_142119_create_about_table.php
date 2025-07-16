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
        Schema::create('about', function (Blueprint $table) {
            $table->id();
            $table->string('nama_sekolah')->nullable();
            $table->text('judul')->nullable();
            $table->text('sub_judul')->nullable();
            $table->text('about')->nullable();
            $table->text('deskripsi')->nullable(); // Deskripsi Sekolah
            $table->text('alamat')->nullable();
            $table->string('no_hp')->nullable();
            $table->string('website')->nullable();
            $table->string('email')->nullable();
            $table->string('instagram')->nullable();
            $table->string('jam_operasional_1')->nullable();
            $table->string('jam_operasional_2')->nullable();
            $table->text('maps')->nullable();
            $table->text('logo_sekolah')->nullable();
            $table->string('gambar')->nullable();
            $table->string('gambar_struktur')->nullable();
            $table->string('barcode')->nullable();
            $table->string('copyright')->nullable();
            $table->timestamps();
        });

        DB::table('about')->insert([
            'nama_sekolah' => 'SMAN 1 Baleendah',
            'judul' => 'Membangun Negeri Membangun Asah',
            'sub_judul' => 'Unggul dalam Prestasi dan Karakter',
            'about' => 'SMAN 1 Baleendah adalah sekolah menengah atas yang berkomitmen dalam membentuk generasi penerus bangsa yang cerdas dan berakhlak mulia. Sekolah ini menjunjung tinggi nilai-nilai integritas, kedisiplinan, dan semangat belajar dalam setiap aspek pendidikan. Dengan dukungan tenaga pendidik yang profesional dan fasilitas yang memadai, SMAN 1 Baleendah terus berinovasi dalam menciptakan lingkungan belajar yang kondusif dan inklusif. Kami percaya bahwa pendidikan bukan hanya tentang pencapaian akademik, tetapi juga tentang pengembangan karakter, kepemimpinan, dan kepedulian sosial. Melalui berbagai kegiatan ekstrakurikuler, program pembinaan siswa, dan kemitraan dengan berbagai pihak, SMAN 1 Baleendah siap mencetak lulusan yang tidak hanya siap menghadapi tantangan masa depan, tetapi juga menjadi agen perubahan positif bagi masyarakat dan bangsa.',
            'deskripsi' => 'Sekolah ini memiliki program unggulan dalam bidang akademik dan non-akademik dengan fasilitas lengkap dan tenaga pengajar profesional.',
            'alamat' => 'Jl. R.A.A Wiranata Kusumah No.30, Baleendah, Kec. Baleendah, Kabupaten Bandung, Jawa Barat 40375',
            'no_hp' => '081234567890',
            'website' => 'https://sman1baleendah.sch.id',
            'email' => 'info@sman1baleendah.sch.id',
            'instagram' => '@sman1baleendah',
            'jam_operasional_1' => 'Senin - Jumat: 07.00 - 13.00 WIB',
            'jam_operasional_2' => 'Sabtu - Minggu: Libur',
            'maps' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.070595955816!2d107.62018607410789!3d-7.0009689685680145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c05145798de3%3A0x42b40e04933a1ac1!2sSMAN%201%20Baleendah!5e0!3m2!1sid!2sid!4v1751885087449!5m2!1sid!2sid',
            'logo_sekolah' => 'logo_sekolah/logo.png',
            'gambar' => 'images/about-us.png',
            'gambar_struktur' => 'struktur/struktur_organisasi.jpg',
            'barcode' => 'barcodes/qr.png',
            'copyright' => 'Copyright © 2025 SMAN 1 Baleendah',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about');
    }
};
