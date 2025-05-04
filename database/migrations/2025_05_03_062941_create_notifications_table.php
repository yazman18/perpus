<?php

// database/migrations/YYYY_MM_DD_HHMMSS_create_notifications_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Relasi dengan user
            $table->text('message'); // Pesan notifikasi
            $table->boolean('read')->default(false); // Status apakah sudah dibaca
            $table->timestamps(); // Waktu pembuatan dan pembaruan notifikasi
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}