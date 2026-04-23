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
        Schema::create('recipes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('cuisine'); // e.g., Italian, Chinese, Indian, Mexican, etc.
            $table->string('dietary'); // e.g., Vegetarian, Vegan, Gluten-Free, etc.
            $table->string('difficulty'); // e.g., Easy, Medium, Hard
            $table->integer('cooking_time')->nullable(); // in minutes
            $table->integer('servings')->nullable();
            $table->json('ingredients'); // array of ingredients
            $table->json('instructions'); // array of steps
            $table->longText('detailed_instruction')->nullable();
            $table->string('image_path')->nullable();
            $table->integer("likes")->default(0);

            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
