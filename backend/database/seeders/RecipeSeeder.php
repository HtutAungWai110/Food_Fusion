<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a default user for recipes if none exists
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'id' => Str::uuid()->toString(),
                'firstname' => 'Admin',
                'lastname' => 'User',
                'email' => 'admin@foodfusion.com',
                'password' => bcrypt('password'),
            ]);
        }

        $recipes = [
            // Italian Cuisine
            [
                'title' => 'Classic Margherita Pizza',
                'description' => 'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil.',
                'cuisine' => 'Italian',
                'dietary' => 'Vegetarian',
                'difficulty' => 'Medium',
                'cooking_time' => 30,
                'servings' => 4,
                'ingredients' => ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil', 'Salt'],
                'instructions' => ['Preheat oven to 450°F', 'Roll out pizza dough', 'Spread tomato sauce evenly', 'Add sliced mozzarella', 'Bake for 12-15 minutes', 'Top with fresh basil and olive oil'],
            ],
            [
                'title' => 'Creamy Carbonara',
                'description' => 'Authentic Roman pasta with eggs, cheese, pancetta, and black pepper.',
                'cuisine' => 'Italian',
                'dietary' => 'None',
                'difficulty' => 'Medium',
                'cooking_time' => 25,
                'servings' => 4,
                'ingredients' => ['Spaghetti', 'Eggs', 'Pecorino Romano cheese', 'Pancetta', 'Black pepper', 'Salt'],
                'instructions' => ['Cook spaghetti in salted water', 'Fry pancetta until crispy', 'Mix eggs with grated cheese', 'Combine hot pasta with pancetta', 'Add egg mixture off heat', 'Season with black pepper'],
            ],
            [
                'title' => 'Risotto ai Funghi',
                'description' => 'Creamy Italian risotto with wild mushrooms and parmesan.',
                'cuisine' => 'Italian',
                'dietary' => 'Vegetarian',
                'difficulty' => 'Hard',
                'cooking_time' => 45,
                'servings' => 4,
                'ingredients' => ['Arborio rice', 'Mixed mushrooms', 'Vegetable broth', 'White wine', 'Parmesan cheese', 'Butter', 'Onion', 'Garlic'],
                'instructions' => ['Sauté onions and garlic', 'Toast rice until translucent', 'Add wine and stir', 'Gradually add warm broth', 'Fold in sautéed mushrooms', 'Finish with butter and parmesan'],
            ],

            // Chinese Cuisine
            [
                'title' => 'Kung Pao Chicken',
                'description' => 'Spicy Sichuan stir-fry with chicken, peanuts, and vegetables.',
                'cuisine' => 'Chinese',
                'dietary' => 'None',
                'difficulty' => 'Medium',
                'cooking_time' => 25,
                'servings' => 4,
                'ingredients' => ['Chicken breast', 'Peanuts', 'Dried chilies', 'Bell peppers', 'Soy sauce', 'Rice vinegar', 'Sugar', 'Garlic', 'Ginger'],
                'instructions' => ['Cut chicken into cubes', 'Make sauce with soy sauce and vinegar', 'Stir-fry chicken until golden', 'Add aromatics and chilies', 'Toss in peanuts and peppers', 'Add sauce and serve with rice'],
            ],
            [
                'title' => 'Vegetable Fried Rice',
                'description' => 'Classic Chinese fried rice with mixed vegetables and eggs.',
                'cuisine' => 'Chinese',
                'dietary' => 'Vegetarian',
                'difficulty' => 'Easy',
                'cooking_time' => 15,
                'servings' => 4,
                'ingredients' => ['Day-old rice', 'Eggs', 'Carrots', 'Peas', 'Green onions', 'Soy sauce', 'Sesame oil'],
                'instructions' => ['Beat eggs and scramble', 'Stir-fry vegetables', 'Add cold rice and break apart', 'Mix in scrambled eggs', 'Season with soy sauce', 'Drizzle with sesame oil'],
            ],
            [
                'title' => 'Sweet and Sour Pork',
                'description' => 'Crispy pork pieces in tangy sweet and sour sauce.',
                'cuisine' => 'Chinese',
                'dietary' => 'None',
                'difficulty' => 'Medium',
                'cooking_time' => 35,
                'servings' => 4,
                'ingredients' => ['Pork shoulder', 'Pineapple chunks', 'Bell peppers', 'Vinegar', 'Sugar', 'Ketchup', 'Cornstarch', 'Soy sauce'],
                'instructions' => ['Cut pork and coat in cornstarch', 'Deep fry until crispy', 'Make sauce with vinegar and sugar', 'Stir-fry peppers and pineapple', 'Add sauce and bring to boil', 'Toss in fried pork'],
            ],

            // Indian Cuisine
            [
                'title' => 'Butter Chicken',
                'description' => 'Rich and creamy tomato-based curry with tender chicken pieces.',
                'cuisine' => 'Indian',
                'dietary' => 'Gluten-Free',
                'difficulty' => 'Medium',
                'cooking_time' => 40,
                'servings' => 4,
                'ingredients' => ['Chicken thighs', 'Tomatoes', 'Heavy cream', 'Butter', 'Garam masala', 'Turmeric', 'Ginger', 'Garlic', 'Cumin'],
                'instructions' => ['Marinate chicken in spices', 'Grill or pan-fry chicken', 'Sauté onions, ginger, garlic', 'Add tomatoes and spices', 'Blend sauce until smooth', 'Add cream and chicken pieces'],
            ],
            [
                'title' => 'Palak Paneer',
                'description' => 'Fresh spinach curry with soft paneer cheese cubes.',
                'cuisine' => 'Indian',
                'dietary' => 'Vegetarian',
                'difficulty' => 'Easy',
                'cooking_time' => 30,
                'servings' => 4,
                'ingredients' => ['Spinach', 'Paneer cheese', 'Onion', 'Tomatoes', 'Cream', 'Garam masala', 'Cumin', 'Ginger', 'Garlic'],
                'instructions' => ['Blanch spinach and blend', 'Sauté onions and aromatics', 'Add spices and tomatoes', 'Pour in spinach puree', 'Cut and fry paneer', 'Add paneer to curry'],
            ],
            [
                'title' => 'Vegetable Biryani',
                'description' => 'Fragrant basmati rice layered with spiced vegetables and herbs.',
                'cuisine' => 'Indian',
                'dietary' => 'Vegan',
                'difficulty' => 'Hard',
                'cooking_time' => 60,
                'servings' => 6,
                'ingredients' => ['Basmati rice', 'Mixed vegetables', 'Yogurt', 'Saffron', 'Fried onions', 'Mint', 'Coriander', 'Biryani masala', 'Ghee'],
                'instructions' => ['Soak rice for 30 minutes', 'Prepare spiced vegetable mixture', 'Parboil rice with whole spices', 'Layer rice over vegetables', 'Top with saffron and herbs', 'Dum cook for 25 minutes'],
            ],

            // Mexican Cuisine
            [
                'title' => 'Chicken Tacos',
                'description' => 'Seasoned chicken in soft tortillas with fresh toppings.',
                'cuisine' => 'Mexican',
                'dietary' => 'None',
                'difficulty' => 'Easy',
                'cooking_time' => 20,
                'servings' => 4,
                'ingredients' => ['Chicken breast', 'Taco seasoning', 'Corn tortillas', 'Lettuce', 'Tomatoes', 'Cheese', 'Sour cream', 'Lime'],
                'instructions' => ['Season and cook chicken', 'Shred or slice chicken', 'Warm tortillas', 'Prepare toppings', 'Assemble tacos', 'Serve with lime'],
            ],
            [
                'title' => 'Guacamole',
                'description' => 'Fresh avocado dip with lime, cilantro, and tomatoes.',
                'cuisine' => 'Mexican',
                'dietary' => 'Vegan',
                'difficulty' => 'Easy',
                'cooking_time' => 10,
                'servings' => 6,
                'ingredients' => ['Ripe avocados', 'Lime juice', 'Cilantro', 'Tomatoes', 'Onion', 'Jalapeño', 'Salt', 'Garlic'],
                'instructions' => ['Halve and pit avocados', 'Mash with fork', 'Dice tomatoes and onions', 'Mix in cilantro and jalapeño', 'Add lime juice and salt', 'Serve immediately'],
            ],
            [
                'title' => 'Veggie Burrito Bowl',
                'description' => 'Nutritious bowl with rice, beans, and fresh Mexican toppings.',
                'cuisine' => 'Mexican',
                'dietary' => 'Vegan',
                'difficulty' => 'Easy',
                'cooking_time' => 25,
                'servings' => 2,
                'ingredients' => ['Rice', 'Black beans', 'Corn', 'Avocado', 'Lettuce', 'Tomatoes', 'Salsa', 'Lime', 'Cilantro'],
                'instructions' => ['Cook rice', 'Warm black beans and corn', 'Chop vegetables', 'Prepare salsa', 'Assemble bowls with all ingredients', 'Top with avocado and lime'],
            ],

            // Japanese Cuisine
            [
                'title' => 'Chicken Teriyaki',
                'description' => 'Grilled chicken glazed with sweet soy-based teriyaki sauce.',
                'cuisine' => 'Japanese',
                'dietary' => 'None',
                'difficulty' => 'Easy',
                'cooking_time' => 25,
                'servings' => 4,
                'ingredients' => ['Chicken thighs', 'Soy sauce', 'Mirin', 'Sugar', 'Ginger', 'Garlic', 'Sesame seeds', 'Green onions'],
                'instructions' => ['Make teriyaki sauce', 'Pan-fry chicken until golden', 'Pour sauce over chicken', 'Simmer until thickened', 'Slice and serve', 'Garnish with sesame seeds'],
            ],
            [
                'title' => 'Miso Soup',
                'description' => 'Traditional Japanese soup with miso paste and tofu.',
                'cuisine' => 'Japanese',
                'dietary' => 'Vegan',
                'difficulty' => 'Easy',
                'cooking_time' => 15,
                'servings' => 2,
                'ingredients' => ['Miso paste', 'Dashi broth', 'Tofu', 'Green onions', 'Wakame seaweed'],
                'instructions' => ['Prepare dashi broth', 'Add tofu cubes', 'Soak wakame seaweed', 'Dissolve miso in broth', 'Add green onions', 'Serve immediately'],
            ],
            [
                'title' => 'Vegetable Tempura',
                'description' => 'Light and crispy battered vegetables served with dipping sauce.',
                'cuisine' => 'Japanese',
                'dietary' => 'Vegetarian',
                'difficulty' => 'Medium',
                'cooking_time' => 30,
                'servings' => 4,
                'ingredients' => ['Assorted vegetables', 'Flour', 'Cornstarch', 'Ice water', 'Tempura dipping sauce', 'Oil for frying'],
                'instructions' => ['Cut vegetables into pieces', 'Make cold tempura batter', 'Heat oil to 350°F', 'Dip vegetables in batter', 'Fry until golden and crispy', 'Serve with dipping sauce'],
            ],

            // Mediterranean Cuisine
            [
                'title' => 'Greek Salad',
                'description' => 'Fresh salad with tomatoes, cucumber, olives, and feta cheese.',
                'cuisine' => 'Mediterranean',
                'dietary' => 'Vegetarian',
                'difficulty' => 'Easy',
                'cooking_time' => 15,
                'servings' => 4,
                'ingredients' => ['Tomatoes', 'Cucumber', 'Red onion', 'Kalamata olives', 'Feta cheese', 'Olive oil', 'Oregano', 'Salt'],
                'instructions' => ['Chop tomatoes and cucumber', 'Slice red onion thinly', 'Combine in large bowl', 'Add olives and feta', 'Drizzle with olive oil', 'Season with oregano and salt'],
            ],
            [
                'title' => 'Falafel Wrap',
                'description' => 'Crispy chickpea fritters wrapped in pita with tahini sauce.',
                'cuisine' => 'Mediterranean',
                'dietary' => 'Vegan',
                'difficulty' => 'Medium',
                'cooking_time' => 45,
                'servings' => 4,
                'ingredients' => ['Dried chickpeas', 'Herbs', 'Spices', 'Pita bread', 'Tahini', 'Lettuce', 'Tomatoes', 'Pickles'],
                'instructions' => ['Soak chickpeas overnight', 'Blend with herbs and spices', 'Form into balls or patties', 'Deep fry until golden', 'Warm pita bread', 'Assemble with vegetables and tahini'],
            ],
            [
                'title' => 'Hummus Platter',
                'description' => 'Creamy chickpea dip served with warm pita and vegetables.',
                'cuisine' => 'Mediterranean',
                'dietary' => 'Vegan',
                'difficulty' => 'Easy',
                'cooking_time' => 10,
                'servings' => 6,
                'ingredients' => ['Chickpeas', 'Tahini', 'Lemon juice', 'Garlic', 'Olive oil', 'Cumin', 'Paprika', 'Pita bread'],
                'instructions' => ['Blend chickpeas and tahini', 'Add lemon juice and garlic', 'Mix until smooth', 'Add olive oil and spices', 'Transfer to serving bowl', 'Serve with warm pita'],
            ],

            // Thai Cuisine
            [
                'title' => 'Pad Thai',
                'description' => 'Stir-fried rice noodles with shrimp, tofu, and peanuts.',
                'cuisine' => 'Thai',
                'dietary' => 'None',
                'difficulty' => 'Medium',
                'cooking_time' => 25,
                'servings' => 4,
                'ingredients' => ['Rice noodles', 'Shrimp', 'Tofu', 'Eggs', 'Bean sprouts', 'Peanuts', 'Tamarind paste', 'Fish sauce', 'Lime'],
                'instructions' => ['Soak rice noodles', 'Make pad thai sauce', 'Stir-fry shrimp and tofu', 'Scramble eggs in pan', 'Add noodles and sauce', 'Top with peanuts and lime'],
            ],
            [
                'title' => 'Green Curry',
                'description' => 'Spicy and creamy Thai curry with vegetables and chicken.',
                'cuisine' => 'Thai',
                'dietary' => 'Gluten-Free',
                'difficulty' => 'Medium',
                'cooking_time' => 35,
                'servings' => 4,
                'ingredients' => ['Chicken', 'Green curry paste', 'Coconut milk', 'Thai eggplant', 'Bamboo shoots', 'Basil', 'Fish sauce', 'Palm sugar'],
                'instructions' => ['Sauté curry paste in coconut cream', 'Add chicken and cook', 'Pour in remaining coconut milk', 'Add vegetables', 'Season with fish sauce and sugar', 'Finish with fresh basil'],
            ],
        ];

        foreach ($recipes as $recipe) {
            Recipe::create([
                'id' => Str::uuid()->toString(),
                'user_id' => $user->id,
                'title' => $recipe['title'],
                'description' => $recipe['description'],
                'cuisine' => $recipe['cuisine'],
                'dietary' => $recipe['dietary'],
                'difficulty' => $recipe['difficulty'],
                'cooking_time' => $recipe['cooking_time'],
                'servings' => $recipe['servings'],
                'ingredients' => json_encode($recipe['ingredients']),
                'instructions' => json_encode($recipe['instructions']),
                'image_path' => null,
            ]);
        }

        $this->command->info('20 recipes seeded successfully!');
    }
}