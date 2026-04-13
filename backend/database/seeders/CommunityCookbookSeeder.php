<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CommunityCookbook;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CommunityCookbookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        $path = 'community_cookbook_images';

        $posts = [
            [
                'post_description' => 'Just tried making homemade pasta from scratch for the first time and I am never going back to store-bought! The texture, the flavor, the satisfaction of rolling out that dough — absolutely worth the 3 hours it took. My kids couldn\'t stop eating it. Sometimes the slow way is the only way. 🍝',
                'likes' => rand(20, 100),
                'image_path' => "$path/homemade_pasta_post.jpg"
            ],
            [
                'post_description' => 'Found this incredible spice blend at a tiny market tucked away in the old part of the city. The vendor said it\'s a family recipe passed down four generations — a mix of smoked paprika, coriander, sumac, and something she wouldn\'t tell me. Threw it on roasted cauliflower and it completely changed the dish. Always talk to the people selling the spices, they know things cookbooks won\'t teach you.',
                'likes' => rand(20, 100),
                'image_path' => "$path/Southwest Seasoning Recipe - Chefjar.jpg"
            ],
            [
                'post_description' => 'Sunday morning tradition: slow-scrambled eggs with fresh chives, sourdough toast slathered in butter, and a cup of black coffee. No rush, no recipe, just the sizzle of butter and the smell of bread toasting. These quiet mornings in the kitchen are the moments that remind me why I fell in love with cooking in the first place.',
                'likes' => rand(20, 100),
                'image_path' => "$path/morning-breakfast.jpg"

            ],
            [
                'post_description' => 'Experimented with a Thai-inspired coconut curry tonight — threw in whatever vegetables were left in the fridge: sweet potato, spinach, bell peppers, and a handful of green beans. Let it simmer for 40 minutes with lemongrass, galangal, and way more chili than I intended. The heat was intense but the coconut milk mellowed it out beautifully. Clean plates all around. That\'s when you know a dish worked.',
                'likes' => rand(20, 100),
                'image_path' => "$path/thati-coconut-curry.jpg"
            ],
            [
                'post_description' => 'Baking is therapy. Spent the afternoon working on a layered sponge cake with strawberry compote and stabilized cream. The first attempt collapsed, the second was lopsided, and the third? Absolutely gorgeous. Sometimes you have to fail twice before the oven gives you what you want. Worth every minute of whisking and waiting.',
                'likes' => rand(20, 100),
                'image_path' => "$path/strawberry-cake.jpg"

            ],
        ];

        foreach ($posts as $post) {
            CommunityCookbook::create([
                'user_id' => $user->id,
                'post_description' => $post['post_description'],
                'image_path' => $post['image_path'],
                'likes' => $post['likes'],
            ]);
        }
    }
}
