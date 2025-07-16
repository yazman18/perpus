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
                'content' => 'Kecerdasan buatan kini digunakan untuk meningkatkan efisiensi dan akurasi dalam proses produksi di berbagai sektor industri. AI membantu dalam mengotomatisasi proses, mengurangi kesalahan manusia, dan meningkatkan kecepatan produksi. Banyak perusahaan kini mengimplementasikan teknologi ini untuk memprediksi kebutuhan pasar, mengelola inventaris, serta memantau kualitas produk secara real-time. Dengan terus berkembangnya teknologi, AI diprediksi akan menjadi tulang punggung revolusi industri 4.0.',
            ],
            [
                'title' => 'Pendidikan Online Menjadi Tren Baru',
                'category' => 'Pendidikan',
                'cover' => 'covers/cover.jpg',
                'short_description' => 'Pembelajaran daring kini menjadi pilihan utama.',
                'content' => 'Dengan kemajuan teknologi, banyak lembaga pendidikan beralih ke sistem pembelajaran online untuk menjangkau lebih banyak siswa. Platform digital memungkinkan proses belajar mengajar dilakukan dari jarak jauh dengan tetap interaktif. Selain itu, fleksibilitas waktu dan akses ke materi yang luas menjadi daya tarik utama. Namun, tantangan seperti koneksi internet, motivasi belajar, dan adaptasi metode pengajaran juga harus terus diatasi agar pendidikan online tetap efektif.',
            ],
            [
                'title' => 'Pemerintah Luncurkan Program Ramah Lingkungan',
                'category' => 'Lingkungan',
                'cover' => 'covers/cover.jpg',
                'short_description' => 'Inisiatif baru untuk mengurangi emisi karbon.',
                'content' => 'Program ini bertujuan mengedukasi masyarakat tentang pentingnya menjaga lingkungan dan mengurangi penggunaan plastik sekali pakai. Pemerintah bekerja sama dengan sekolah, komunitas, dan perusahaan dalam kampanye nasional bertajuk "Hijaukan Negeri". Langkah-langkah seperti penanaman pohon, daur ulang sampah, dan penggunaan energi terbarukan juga menjadi bagian dari strategi jangka panjang menuju pembangunan berkelanjutan.',
            ],
            [
                'title' => 'Startup Lokal Tembus Pasar Internasional',
                'category' => 'Bisnis',
                'cover' => 'covers/cover.jpg',
                'short_description' => 'Inovasi anak bangsa diapresiasi global.',
                'content' => 'Salah satu startup teknologi asal Indonesia berhasil mendapatkan pendanaan dan ekspansi ke Asia Tenggara. Produk digital yang dikembangkan berfokus pada solusi logistik berbasis AI dan blockchain. Berkat inovasi tersebut, perusahaan ini dinilai mampu bersaing di kancah global dan menciptakan peluang kerja baru bagi anak muda lokal. Keberhasilan ini menunjukkan potensi besar industri startup Indonesia untuk mendunia.',
            ],
            [
                'title' => 'Tips Menjaga Kesehatan Mental di Era Digital',
                'category' => 'Kesehatan',
                'cover' => 'covers/cover.jpg',
                'short_description' => 'Kesehatan mental penting di tengah arus informasi cepat.',
                'content' => 'Masyarakat diimbau menjaga keseimbangan antara kehidupan nyata dan aktivitas digital. Terlalu lama menatap layar dapat memicu stres, kelelahan, dan gangguan tidur. Oleh karena itu, penting untuk menetapkan batasan penggunaan perangkat dan meluangkan waktu untuk aktivitas fisik dan sosial. Konseling daring juga kini tersedia sebagai alternatif penanganan awal gangguan mental ringan hingga sedang.',
            ],
            [
                'title' => 'Festival Musik Indonesia Kembali Digelar',
                'category' => 'Hiburan',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Acara tahunan musik terbesar hadir lagi tahun ini.',
                'content' => 'Festival ini akan menampilkan musisi ternama serta bakat baru dari seluruh penjuru Indonesia. Berlangsung selama tiga hari, pengunjung akan disuguhkan dengan beragam genre musik, dari pop hingga tradisional. Selain pertunjukan musik, festival ini juga menghadirkan workshop, kuliner lokal, dan bazar UMKM sebagai dukungan terhadap ekonomi kreatif. Acara ini diharapkan menjadi ajang berkumpulnya komunitas musik nasional.',
            ],
            [
                'title' => 'Penemuan Arkeologi di Jawa Timur',
                'category' => 'Sains',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Situs bersejarah ditemukan oleh tim peneliti lokal.',
                'content' => 'Penemuan ini menambah bukti sejarah panjang peradaban di wilayah Nusantara. Tim arkeolog menemukan struktur bangunan kuno, alat-alat batu, dan pecahan keramik yang diperkirakan berasal dari abad ke-10. Temuan ini membuka peluang baru untuk riset sejarah dan pariwisata budaya. Pemerintah daerah merencanakan pengembangan situs tersebut sebagai destinasi edukatif dan konservasi sejarah.',
            ],
            [
                'title' => 'Ekonomi Digital Tumbuh Pesat di Asia Tenggara',
                'category' => 'Ekonomi',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Pertumbuhan e-commerce dan fintech meningkat tajam.',
                'content' => 'Laporan terbaru menunjukkan bahwa ekonomi digital menjadi pendorong utama pemulihan ekonomi pasca pandemi. E-commerce, pembayaran digital, dan layanan on-demand menjadi sektor dengan pertumbuhan tercepat. Investasi asing juga mulai mengalir deras ke startup digital di kawasan Asia Tenggara, termasuk Indonesia. Pemerintah terus mendorong regulasi yang mendukung inovasi sekaligus melindungi konsumen.',
            ],
            [
                'title' => 'Desain Interior Minimalis Semakin Digemari',
                'category' => 'Lifestyle',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Gaya hidup simpel mendominasi pilihan masyarakat urban.',
                'content' => 'Interior minimalis dianggap efisien dan estetik untuk ruang modern. Konsep ini menekankan penggunaan elemen fungsional dengan warna netral, pencahayaan alami, dan tata letak sederhana. Tren ini juga selaras dengan gaya hidup ramah lingkungan karena mendorong penggunaan barang secara bijak dan pengurangan konsumsi berlebihan. Banyak desainer interior kini memadukan elemen lokal dalam desain minimalis.',
            ],
            [
                'title' => 'Kampanye Literasi Digital untuk Remaja',
                'category' => 'Sosial',
                'cover' => 'covers/cover1.jpg',
                'short_description' => 'Meningkatkan kesadaran remaja dalam menggunakan internet secara bijak.',
                'content' => 'Kampanye ini dilakukan melalui media sosial, webinar, dan kerjasama dengan sekolah-sekolah. Fokus utama kampanye adalah memberikan edukasi mengenai etika digital, keamanan siber, dan dampak penggunaan media sosial terhadap kesehatan mental. Program ini diharapkan dapat membentuk generasi muda yang cerdas digital, mampu memilah informasi, dan menjaga jejak digital mereka dengan bijak.',
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