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
            // 1. Give the UUID a name, usually 'id'
            $table->uuid('id')->primary();

            $table->string('firstname');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('password');
            $table->integer("login_attempts")->default(0);
            $table->string("image_path")->nullable()->default(null);

            // // 2. Use 'dateTime' or 'timestamp' for lockouts (Date only stores YYYY-MM-DD)
            $table->timestamp("lockout_until")->nullable()->default(null);
            $table->timestamp("created_at")->useCurrent();
            $table->timestamp("last_updated_at")->useCurrent();

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
