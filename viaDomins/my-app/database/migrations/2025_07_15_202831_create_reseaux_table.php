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
        Schema::create('resaux', function (Blueprint $table) {
            $table->id();
            $table->foreignId('domaine_id')->constrained('domaines')->onDelete('cascade');
            $table->string('ping')->nullable(); // ex: "152 ms"
            $table->string('http_status')->nullable(); // ex: "200 OK"
            $table->string('ssl_expiration')->nullable(); // "13/08/2025"
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resaux');
    }
};
