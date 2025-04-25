<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('peminjamans', function (Blueprint $table) {
            $table->enum('status_peminjaman', ['pending', 'disetujui', 'ditolak'])->default('pending');
            $table->enum('status_pengembalian', ['belum melakukan pengembalian','pending', 'disetujui', 'ditolak'])->nullable()->default('belum melakukan pengembalian');
        });
    }

    public function down(): void
    {
        Schema::table('peminjamans', function (Blueprint $table) {
            $table->dropColumn(['status_peminjaman', 'status_pengembalian']);
        });
    }
};
