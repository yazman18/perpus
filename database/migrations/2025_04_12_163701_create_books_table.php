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
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
