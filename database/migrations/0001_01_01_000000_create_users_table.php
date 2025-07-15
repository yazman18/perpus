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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // $table->string('alamat')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('id_number')->nullable();
            $table->enum('role', ['siswa', 'guru', 'admin'])->nullable();
            $table->rememberToken();
            $table->string('password');
            $table->timestamps();
        });

        DB::table('users')->insert([
            [
                'name' => 'Admin Utama',
                // 'alamat' => 'Jl. Contoh No.1',
                'tanggal_lahir' => '1990-01-01',
                'email' => 'admin@example.com',
                'id_number' => 'ADM001',
                'role' => 'admin',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Siswa Satu',
                // 'alamat' => 'Jl. Pelajar No.2',
                'tanggal_lahir' => '2005-05-10',
                'email' => 'siswa@example.com',
                'id_number' => 'SIS001',
                'role' => 'siswa',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Guru Hebat',
                // 'alamat' => 'Jl. Pendidikan No.3',
                'tanggal_lahir' => '1985-03-20',
                'email' => 'guru@example.com',
                'id_number' => 'GUR001',
                'role' => 'guru',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};