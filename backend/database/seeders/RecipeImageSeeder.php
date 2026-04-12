<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RecipeImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = "recipe_images";
        $images = [
            "Classic Margherita Pizza" => "$path/classic-margherita-pizza.jpg",
            "Creamy Carbonara" => "$path/creamy-carbonara.jpg",
            "Risotto ai Funghi" => "$path/risotto-ai-funghi.webp",
            "Kung Pao Chicken" => "$path/kung-pao-chicken.jpg",
            "Vegetable Fried Rice" => "$path/vegetable-fried-rice.jpg",
            "Sweet and Sour Pork" => "$path/sweet-and-sour-pork.webp",
            "Butter Chicken" => "$path/butter-chicken.jpg",
            "Palak Paneer" => "$path/palak-paneer.jpg",
            "Vegetable Biryani" => "$path/vegetable-biryani.webp",
            "Chicken Tacos" => "$path/chicken-tacos.jpg",
            "Guacamole" => "$path/guacamole.webp",
            "Veggie Burrito Bowl" => "$path/veggie-burrito-bowl.jpg",
            "Chicken Teriyaki" => "$path/chicken-teriyaki.webp",
            "Miso Soup" => "$path/miso-soup.jpg",
            "Vegetable Tempura" => "$path/vegetable_tempura.webp",
            "Greek Salad" => "$path/greek-salad.jpg",
            "Falafel Wrap" => "$path/falafel-wrap.jpg",
            "Hummus Platter" => "$path/hummus-platter.jpg",
            "Pad Thai" => "$path/pad-thai.jpg",
            "Green Curry" => "$path/green_curry.jpg",
        ];

        foreach ($images as $title => $imagePath) {
            Recipe::where('title', $title)->update(['image_path' => $imagePath]);
        }

        $this->command->info('Recipe images updated successfully!');
    }
}
