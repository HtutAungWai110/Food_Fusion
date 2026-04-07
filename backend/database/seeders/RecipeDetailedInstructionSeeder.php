<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipeDetailedInstructionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $detailedInstructions = [
            // Italian Cuisine
            'Classic Margherita Pizza' => '
## Step 1: Prepare the Dough
Take your pizza dough out of the refrigerator 30 minutes before using to let it come to room temperature. Lightly flour your work surface and hands. Gently stretch and shape the dough into a 12-inch round, leaving the edges slightly thicker for the crust. Do not use a rolling pin as this will compress the dough and make it tough.

## Step 2: Preheat the Oven
Preheat your oven to 450°F (230°C). If you have a pizza stone, place it in the oven during preheating. The stone will help create a crispy crust by transferring heat directly to the dough.

## Step 3: Prepare the Sauce
Use high-quality tomato sauce or crush San Marzano tomatoes by hand. Season with a pinch of salt and a drizzle of olive oil. Do not over-season as the fresh ingredients will provide plenty of flavor.

## Step 4: Assemble the Pizza
Transfer your stretched dough to a pizza peel or baking sheet lined with parchment paper. Spread the tomato sauce evenly across the dough, leaving about 1 inch around the edges for the crust. Slice fresh mozzarella into 1/4-inch thick rounds and distribute them evenly across the pizza.

## Step 5: Bake the Pizza
Slide the pizza onto the preheated pizza stone or place the baking sheet in the oven. Bake for 12-15 minutes until the crust is golden brown and the cheese is bubbly and slightly charred in spots.

## Step 6: Finish and Serve
Remove from the oven and immediately top with fresh basil leaves. Drizzle with extra virgin olive oil and add a pinch of salt to taste. Let rest for 2-3 minutes before slicing. Serve immediately while hot.',

            'Creamy Carbonara' => '
## Step 1: Prepare the Ingredients
Grate 1 cup of Pecorino Romano cheese finely. Cut 6 ounces of pancetta or guanciale into small cubes, about 1/4 inch in size. Separate 4 large egg yolks from the whites and whisk the yolks together with the grated cheese and a generous amount of freshly cracked black pepper.

## Step 2: Cook the Pasta
Bring a large pot of salted water to boil. Add 1 pound of spaghetti and cook until al dente, about 8-10 minutes. Reserve 1 cup of the starchy pasta cooking water before draining the pasta.

## Step 3: Cook the Pancetta
While the pasta cooks, place the pancetta in a cold large skillet or Dutch oven. Turn the heat to medium and cook slowly, rendering the fat until the pancetta is crispy, about 8-10 minutes. Remove from heat but keep the fat in the pan.

## Step 4: Combine Pasta and Pancetta
Add the drained hot pasta directly to the pan with the pancetta. Toss well to coat the pasta in the rendered fat. Make sure the pan is OFF the heat to prevent scrambling the eggs.

## Step 5: Add the Egg Mixture
Working quickly, pour the egg and cheese mixture over the hot pasta. Toss vigorously using tongs, adding pasta water a little at a time to create a creamy emulsion. The residual heat from the pasta will cook the eggs gently without scrambling them.

## Step 6: Serve
Continue tossing until the sauce coats the pasta and achieves a silky consistency. Add more black pepper to taste. Serve immediately in warm bowls, topped with additional grated cheese and cracked black pepper.',

            'Risotto ai Funghi' => '
## Step 1: Prepare the Broth
Heat 6 cups of vegetable broth in a saucepan and keep it warm over low heat. The broth should be hot when added to the rice to maintain even cooking temperature.

## Step 2: Prepare the Mushrooms
Clean 1 pound of mixed mushrooms (porcini, cremini, shiitake) by wiping with a damp cloth. Slice them into pieces. Heat 2 tablespoons of butter in a large pan and sauté half the mushrooms until golden and slightly crispy, about 5-7 minutes. Set aside for garnish.

## Step 3: Toast the Aromatics
In a large heavy-bottomed pot, melt 2 tablespoons of butter over medium heat. Add 1 finely diced onion and 2 minced garlic cloves. Sauté until translucent, about 3-4 minutes. Add the remaining mushrooms and cook for another 3 minutes.

## Step 4: Toast the Rice
Add 1.5 cups of Arborio rice to the pot. Stir constantly for about 2 minutes until the rice becomes slightly translucent at the edges and smells nutty. Add 1/2 cup of dry white wine and stir until fully absorbed.

## Step 5: Add Broth Gradually
Begin adding the warm broth one ladle at a time, stirring constantly. Wait until the liquid is almost completely absorbed before adding the next ladle. Continue this process for about 18-20 minutes. The rice should be tender but still have a slight bite (al dente).

## Step 6: Finish the Risotto
Remove from heat. Add the reserved sautéed mushrooms, 1/2 cup grated Parmesan cheese, and 2 tablespoons of cold butter. Stir vigorously for about 1 minute to create a creamy texture. Season with salt and pepper. Serve immediately on warm plates, garnished with fresh parsley and extra Parmesan.',

            // Chinese Cuisine
            'Kung Pao Chicken' => '
## Step 1: Prepare the Ingredients
Cut 1.5 pounds of chicken breast into 1-inch cubes. In a bowl, mix 2 tablespoons soy sauce, 1 tablespoon rice vinegar, 1 tablespoon sugar, and 1 teaspoon cornstarch to create the sauce. Set aside.

## Step 2: Marinate the Chicken
Place chicken cubes in a bowl with 1 tablespoon soy sauce, 1 teaspoon cornstarch, and 1 tablespoon rice wine. Mix well and let marinate for 15 minutes at room temperature.

## Step 3: Prepare Aromatics and Vegetables
Slice 2 bell peppers into 1-inch pieces. Mince 4 cloves of garlic and 1 inch of fresh ginger. Break 8-10 dried red chilies into pieces, removing seeds if you prefer less heat. Measure out 1/2 cup roasted peanuts.

## Step 4: Stir-fry the Chicken
Heat 2 tablespoons of oil in a wok over high heat until smoking. Add marinated chicken and stir-fry until golden brown and cooked through, about 4-5 minutes. Remove chicken and set aside.

## Step 5: Stir-fry Aromatics and Vegetables
Heat another tablespoon of oil in the wok. Add dried chilies, garlic, and ginger. Stir-fry for 30 seconds until fragrant. Add bell peppers and stir-fry for 1-2 minutes until slightly softened but still crisp.

## Step 6: Combine and Serve
Return chicken to the wok. Pour in the sauce and toss everything together for 1-2 minutes until the sauce thickens and coats everything evenly. Add peanuts and stir for 30 seconds. Serve immediately over steamed white rice.',

            'Vegetable Fried Rice' => '
## Step 1: Prepare the Rice
Use day-old cold rice that has been refrigerated overnight. This helps the rice stay separate and not become mushy. Break up any clumps with your fingers before cooking. You need about 4 cups of cooked rice.

## Step 2: Prepare Vegetables
Dice 2 carrots into small pieces, measure 1/2 cup of peas, and slice 4 green onions into thin rounds. Beat 3 eggs in a bowl with a pinch of salt.

## Step 3: Scramble the Eggs
Heat 1 tablespoon of oil in a large wok or skillet over medium-high heat. Pour in beaten eggs and scramble quickly until just set. Remove eggs and set aside.

## Step 4: Stir-fry Vegetables
Add another tablespoon of oil to the wok. Add carrots and stir-fry for 2 minutes. Add peas and continue cooking for 1 minute. The vegetables should be tender but still have a bite.

## Step 5: Add Rice
Add the cold rice to the wok. Use a spatula to break up any remaining clumps and stir-fry for 3-4 minutes until the rice is heated through and slightly toasted. Add 3 tablespoons of soy sauce and toss to combine evenly.

## Step 6: Finish and Serve
Add the scrambled eggs back to the wok along with most of the green onions. Toss everything together for 1 minute. Drizzle with 1 teaspoon of sesame oil and top with remaining green onions. Serve immediately.',

            'Sweet and Sour Pork' => '
## Step 1: Prepare the Pork
Cut 1.5 pounds of pork shoulder into 1-inch cubes. In a bowl, mix 1/2 cup cornstarch, 1/4 cup flour, 1 egg, and cold water to make a thick batter. Season the pork pieces with salt and pepper, then coat thoroughly with the batter.

## Step 2: Make the Sweet and Sour Sauce
In a saucepan, combine 1/2 cup rice vinegar, 1/2 cup sugar, 2 tablespoons ketchup, 1 tablespoon soy sauce, and 1/2 cup water. Bring to a boil. Mix 1 tablespoon of cornstarch with 2 tablespoons water and add to the sauce. Cook until thickened, about 2 minutes.

## Step 3: Deep-fry the Pork
Heat oil in a deep pan to 350°F (175°C). Add the battered pork pieces in batches and fry for 4-5 minutes until golden brown and crispy. Remove and drain on paper towels. For extra crispiness, fry the pork again for 30 seconds at higher heat (375°F) just before serving.

## Step 4: Stir-fry Vegetables
In a wok, heat 1 tablespoon of oil over high heat. Add 1 diced bell pepper (red or green) and 1/2 cup pineapple chunks. Stir-fry for 2 minutes until peppers are slightly tender.

## Step 5: Combine
Pour the sweet and sour sauce into the wok with vegetables. Bring to a simmer. Add the crispy pork pieces and toss quickly to coat. Do not over-stir or the coating will become soggy.

## Step 6: Serve
Transfer to a serving dish immediately. The sauce should coat the pork but the coating should still remain crispy. Serve with steamed white rice.',

            // Indian Cuisine
            'Butter Chicken' => '
## Step 1: Marinate the Chicken
Cut 2 pounds of boneless chicken thighs into 1-inch pieces. In a large bowl, mix 1 cup yogurt, 2 tablespoons lemon juice, 2 teaspoons turmeric, 1 teaspoon cayenne pepper, 2 teaspoons garam masala, and 1 tablespoon each of minced ginger and garlic. Add chicken, coat well, and refrigerate for at least 1 hour, preferably overnight.

## Step 2: Cook the Chicken
Preheat your oven to 400°F (200°C) or heat a grill pan. Thread marinated chicken onto skewers and cook for 15-20 minutes until charred and cooked through. Alternatively, pan-fry in batches until golden. Set aside.

## Step 3: Prepare the Base
In a large heavy-bottomed pot, melt 4 tablespoons of butter over medium heat. Add 1 large diced onion and cook until golden brown, about 8-10 minutes. Add 2 tablespoons minced ginger and 1 tablespoon minced garlic. Sauté for 2 minutes until fragrant.

## Step 4: Make the Tomato Sauce
Add 2 teaspoons cumin, 2 teaspoons coriander, 1 teaspoon turmeric, and 1 teaspoon chili powder. Cook for 1 minute. Add 2 cups of crushed tomatoes (or tomato puree) and 1 cup water. Simmer for 15 minutes. Blend the sauce until smooth using an immersion blender.

## Step 5: Finish the Curry
Return sauce to pot and add 1 cup heavy cream and 1 teaspoon sugar. Stir well. Add the cooked chicken pieces and simmer for 10 minutes. Add 1 more tablespoon of butter and 1 teaspoon garam masala. Season with salt to taste.

## Step 6: Serve
Let the curry rest for 5 minutes before serving. Garnish with fresh cilantro and a swirl of cream. Serve with basmati rice, naan bread, or roti.',

            'Palak Paneer' => '
## Step 1: Blanch the Spinach
Bring a large pot of water to boil. Add 1 pound of fresh spinach and blanch for 2 minutes until wilted. Immediately transfer to an ice bath to stop cooking and preserve the bright green color. Drain well and blend into a smooth puree using a blender or food processor. Set aside.

## Step 2: Prepare the Paneer
Cut 400g of paneer cheese into 1-inch cubes. Heat 2 tablespoons of oil in a large pan over medium heat. Fry paneer cubes until golden brown on all sides, about 2-3 minutes. Remove and set aside. Alternatively, you can use the paneer as-is without frying for a softer texture.

## Step 3: Cook the Aromatics
In the same pan, add 1 tablespoon of oil or ghee. Add 1 large diced onion and cook until golden brown, about 5-6 minutes. Add 1 tablespoon minced ginger and 1 tablespoon minced garlic. Sauté for 1 minute until fragrant.

## Step 4: Add Spices and Tomatoes
Add 2 medium diced tomatoes and cook until soft, about 5 minutes. Add 1 teaspoon cumin powder, 1 teaspoon coriander powder, 1/2 teaspoon turmeric, and 1/2 teaspoon garam masala. Cook for 2 minutes until the oil begins to separate from the mixture.

## Step 5: Combine Everything
Add the spinach puree to the pan along with 1/2 cup of water. Stir well and simmer for 5 minutes. Add the fried paneer cubes and 1/4 cup of cream. Simmer for another 3-4 minutes until the paneer absorbs the flavors. Add salt to taste.

## Step 6: Serve
Transfer to a serving bowl. Drizzle with additional cream and sprinkle with garam masala. Serve hot with naan, roti, or basmati rice.',

            'Vegetable Biryani' => '
## Step 1: Soak the Rice
Rinse 2 cups of basmati rice in several changes of water until the water runs clear. Soak in fresh water for 30 minutes. Drain before cooking.

## Step 2: Prepare the Vegetable Masala
Heat 3 tablespoons of ghee in a large heavy-bottomed pot. Add 1 bay leaf, 4 cardamom pods, 4 cloves, and 1 cinnamon stick. Sauté for 30 seconds. Add 2 sliced onions and cook until golden brown, about 10 minutes. Add 2 tablespoons ginger-garlic paste and cook for 2 minutes.

## Step 3: Add Vegetables and Spices
Add 2 cups mixed vegetables (carrots, peas, beans, potatoes, cauliflower). Sauté for 5 minutes. Add 1 teaspoon turmeric, 1 tablespoon biryani masala, 1/2 cup yogurt, and 1/2 cup chopped mint. Cook for 5 minutes. Set aside half of this mixture.

## Step 4: Cook the Rice
In a separate pot, bring 4 cups of water to boil with 2 bay leaves, 4 cardamom pods, 4 cloves, and 1 tablespoon of salt. Add drained rice and cook until 70% done (about 5-6 minutes). The rice should still have a slight bite. Drain and set aside.

## Step 5: Layer and Dum Cook
In the heavy-bottomed pot with half the vegetable mixture, spread the remaining vegetable mixture on the bottom. Layer the partially cooked rice on top. Add saffron milk (1/4 cup warm milk with saffron threads). Top with fried onions, chopped coriander, mint, and ghee. Cover tightly with a lid.

## Step 6: Dum Cooking
Place the pot on a flat griddle or tawa over medium heat for 5 minutes, then reduce to low heat. Cook for 20-25 minutes (dum cooking). Do not open the lid during this time. Remove from heat and let rest for 5 minutes. Gently mix before serving. Garnish with fried onions and serve with raita.',

            // Mexican Cuisine
            'Chicken Tacos' => '
## Step 1: Season the Chicken
Pat dry 1.5 pounds of chicken breast. Rub with 2 tablespoons of taco seasoning (or a mix of 1 teaspoon each of cumin, chili powder, paprika, garlic powder, and onion powder), salt, and pepper. Drizzle with 1 tablespoon of olive oil to help the spices adhere.

## Step 2: Cook the Chicken
Heat a large skillet over medium-high heat. Add the seasoned chicken and cook for 6-7 minutes per side until golden brown and cooked through (internal temperature of 165°F). Remove from heat and let rest for 5 minutes.

## Step 3: Shred or Slice the Chicken
Using two forks, shred the chicken or slice it into thin strips, depending on your preference. Return to the pan with any accumulated juices to keep it moist.

## Step 4: Prepare the Tortillas
Heat corn tortillas in a dry skillet over medium heat for 30 seconds per side, or until pliable and slightly charred. Alternatively, wrap in damp paper towels and microwave for 30 seconds to soften.

## Step 5: Prepare Toppings
Shred lettuce, dice tomatoes, grate cheese, slice jalapeños, and prepare sour cream. Cut limes into wedges. Arrange all toppings in small bowls for easy assembly.

## Step 6: Assemble and Serve
Fill each tortilla with seasoned chicken. Top with lettuce, tomatoes, cheese, sour cream, and any other desired toppings. Squeeze fresh lime juice over the top. Serve immediately with additional lime wedges on the side.',

            'Guacamole' => '
## Step 1: Select and Prepare Avocados
Choose 3-4 ripe Hass avocados (they should yield slightly to gentle pressure). Cut each avocado in half lengthwise around the pit. Remove the pit by striking it with a knife blade and twisting. Scoop the flesh into a large bowl using a spoon.

## Step 2: Mash the Avocados
Using a fork or potato masher, mash the avocado to your desired consistency. For chunky guacamole, leave some larger pieces. For smoother guacamole, mash more thoroughly.

## Step 3: Prepare the Mix-ins
Finely dice 1 medium tomato (seeded and drained of excess juice), 1/4 red onion, and 1-2 jalapeño peppers (seeds removed for less heat). Roughly chop 1/4 cup fresh cilantro leaves. Mince 1-2 cloves of garlic.

## Step 4: Combine and Season
Add the diced tomato, onion, jalapeño, cilantro, and garlic to the mashed avocado. Squeeze the juice of 1 lime over the mixture. Add 1/2 teaspoon of salt (or to taste). Gently fold everything together using a folding motion to avoid overmixing.

## Step 5: Taste and Adjust
Taste the guacamole and adjust seasoning as needed. Add more lime juice if it needs brightness, more salt to enhance flavor, or more jalapeño for heat. Remember that flavors will develop as it sits.

## Step 6: Serve Immediately
Transfer to a serving bowl. To prevent browning, press plastic wrap directly onto the surface of the guacamole, removing all air pockets. Serve within 2 hours with tortilla chips, or store refrigerated for up to 1 day.',

            'Veggie Burrito Bowl' => '
## Step 1: Cook the Rice
Rinse 1 cup of rice until water runs clear. Combine with 2 cups of water and a pinch of salt in a saucepan. Bring to boil, reduce heat to low, cover, and simmer for 15-18 minutes until water is absorbed. Remove from heat and let stand covered for 5 minutes. Fluff with a fork.

## Step 2: Prepare the Beans
Drain and rinse 1 can (15 oz) of black beans. In a saucepan, heat 1 tablespoon of olive oil over medium heat. Add 1 minced garlic clove and cook for 30 seconds. Add beans with 1/4 cup water, 1 teaspoon cumin, and a pinch of salt. Simmer for 5-7 minutes until heated through and slightly thickened.

## Step 3: Prepare the Vegetables
Thaw 1/2 cup of corn (or use fresh corn kernels). Dice 1 large tomato and shred 2 cups of lettuce. Dice 1 avocado. Chop 1/4 cup fresh cilantro. Prepare your favorite salsa.

## Step 4: Make Quick Pickled Onions (Optional)
Thinly slice 1/2 red onion. Combine with 1/2 cup vinegar, 1/4 cup water, 1 tablespoon sugar, and 1 teaspoon salt in a jar. Let sit for at least 15 minutes (or refrigerate overnight for best results).

## Step 5: Assemble the Bowls
Divide the cooked rice between 2-4 serving bowls. Top each with black beans, corn, lettuce, tomatoes, avocado, salsa, and pickled onions if using. Add a dollop of sour cream or dairy-free alternative.

## Step 6: Serve
Squeeze fresh lime juice over each bowl. Garnish with cilantro and serve with additional lime wedges on the side. These bowls can be stored in the refrigerator for 3-4 days when assembled without the avocado (add avocado fresh when serving).',

            // Japanese Cuisine
            'Chicken Teriyaki' => '
## Step 1: Make the Teriyaki Sauce
In a saucepan, combine 1/2 cup soy sauce, 1/2 cup mirin, 1/4 cup sake, and 2 tablespoons sugar. Bring to a simmer over medium heat, stirring until sugar dissolves. For a thicker sauce, mix 1 teaspoon cornstarch with 1 tablespoon water and whisk into the simmering sauce. Cook for 2-3 minutes until thickened. Remove from heat and set aside.

## Step 2: Prepare the Chicken
Cut 1.5 pounds of boneless chicken thighs into bite-sized pieces or leave whole if preferred. Season lightly with salt and pepper. For extra crispy skin, score the skin side in a crosshatch pattern.

## Step 3: Cook the Chicken
Heat 1 tablespoon of vegetable oil in a large skillet over medium-high heat. Place chicken skin-side down and cook for 4-5 minutes until golden brown and crispy. Flip and cook for another 4-5 minutes until cooked through.

## Step 4: Add the Sauce
Reduce heat to medium. Pour the teriyaki sauce over the chicken. Continue cooking and turning the chicken for 2-3 minutes, allowing the sauce to reduce and glaze the chicken pieces. The sauce should coat the back of a spoon and have a shiny appearance.

## Step 5: Rest and Slice
Remove chicken from the pan and let rest for 2-3 minutes. If you cooked whole pieces, slice into strips against the grain. The resting allows the juices to redistribute for juicier meat.

## Step 6: Serve
Arrange sliced chicken over steamed Japanese rice. Drizzle remaining sauce from the pan over the chicken. Garnish with toasted sesame seeds and sliced green onions. Serve immediately with steamed vegetables on the side.',

            'Miso Soup' => '
## Step 1: Prepare the Dashi
In a pot, bring 4 cups of water to a boil. If using instant dashi powder, dissolve 1 teaspoon in the water. For traditional dashi, soak a 4-inch piece of kombu (kelp) in cold water for 30 minutes, bring to a near-boil, remove the kombu, and add a handful of bonito flakes. Strain and discard the solids.

## Step 2: Prepare the Tofu
Cut 1/2 block of silken tofu into 1/2-inch cubes. Handle gently as silken tofu is very delicate and breaks easily. Set aside.

## Step 3: Prepare Other Ingredients
Soak 1 tablespoon of dried wakame seaweed in water for 5 minutes until rehydrated. Drain and set aside. Slice 2 green onions thinly on the diagonal for garnish.

## Step 4: Add Tofu and Wakame
Bring the dashi to a gentle simmer. Add the tofu cubes and rehydrated wakame. Simmer for 1-2 minutes. Do not let the soup boil vigorously as this will break apart the delicate tofu.

## Step 5: Add the Miso
Remove the pot from heat. Place 3-4 tablespoons of miso paste in a ladle and lower it partially into the soup. Use chopsticks to dissolve the miso completely before releasing it into the soup. Never add miso to boiling liquid as high heat destroys its beneficial enzymes and flavor.

## Step 6: Serve
Ladle into individual bowls. Sprinkle with sliced green onions. Serve immediately while hot. Miso soup is traditionally served as part of a Japanese breakfast or alongside any meal. Do not reheat miso soup after adding the miso.',

            'Vegetable Tempura' => '
## Step 1: Prepare the Vegetables
Select an assortment of vegetables: sweet potatoes (sliced 1/4 inch thick), zucchini (rounds), eggplant (slices), bell peppers (strips), broccoli (florets), shiitake mushrooms (whole), and green beans (whole). Cut all vegetables into similar-sized pieces for even cooking. Pat completely dry with paper towels.

## Step 2: Make the Tempura Batter
Sift 1 cup of all-purpose flour and 1/4 cup cornstarch into a bowl. Add 1 cup of ice-cold water and gently mix with chopsticks. Do not overmix - some lumps are fine. The key to crispy tempura is using very cold water and minimal mixing. The batter should be thin, like heavy cream.

## Step 3: Prepare the Dipping Sauce
Combine 1/2 cup dashi stock, 2 tablespoons soy sauce, and 1 tablespoon mirin in a small saucepan. Heat until warm. Set aside. This is called tentsuyu sauce. Grate daikon radish and ginger to serve alongside.

## Step 4: Heat the Oil
Pour 3-4 inches of oil into a deep, heavy pot. Heat to 350°F (175°C). Use a thermometer to maintain consistent temperature. The oil is ready when a drop of batter sizzles immediately and rises to the surface.

## Step 5: Fry the Vegetables
Working in batches, dip vegetables in batter, letting excess drip off. Carefully lower into hot oil. Fry for 2-3 minutes until light golden. Do not overcrowd the pot. Maintain oil temperature between batches. Transfer to a wire rack or paper towels to drain.

## Step 6: Serve
Arrange tempura on a platter lined with paper. Serve immediately while hot and crispy with the dipping sauce. Add grated daikon and ginger to individual dipping bowls. Tempura is best eaten immediately as it loses crispiness when cooled.',

            // Mediterranean Cuisine
            'Greek Salad' => '
## Step 1: Prepare the Vegetables
Wash and dry all vegetables thoroughly. Cut 4 large ripe tomatoes into wedges or large chunks. Slice 1 English cucumber into half-moons (about 1/4 inch thick). Slice 1 red onion into thin half-moons.

## Step 2: Prepare Olives and Cheese
Measure 1/2 cup of Kalamata olives. If they have pits, remove them by pressing with the side of a knife. Cut a block of feta cheese into large cubes (about 1 inch) or crumble for a different texture.

## Step 3: Combine the Salad
In a large shallow bowl or platter, combine tomatoes, cucumber, and red onion. Add the Kalamata olives. Do not toss vigorously as Greek salad is meant to be layered and arranged, not mixed.

## Step 4: Add the Cheese
Place the feta cheese cubes on top of the vegetables in the center of the salad. Alternatively, place one large slab of feta on top and let diners break off pieces themselves.

## Step 5: Season and Dress
Drizzle generously with extra virgin olive oil (about 3-4 tablespoons). Sprinkle with dried oregano (about 1 teaspoon). Add salt to taste - be careful as feta and olives are already salty. Some Greeks also add a splash of red wine vinegar, though traditional horiatiki does not include vinegar.

## Step 6: Serve
Serve immediately with crusty bread to soak up the delicious tomato-olive oil juices at the bottom of the bowl. Do not refrigerate after dressing as tomatoes lose flavor when cold. Best served at room temperature.',

            'Falafel Wrap' => '
## Step 1: Soak the Chickpeas
Place 1 cup of dried chickpeas in a large bowl and cover with cold water. Soak overnight (at least 12 hours). Drain thoroughly. Do not use canned chickpeas as they contain too much moisture.

## Step 2: Prepare the Falafel Mixture
In a food processor, combine the drained chickpeas, 1/2 cup fresh parsley, 1/2 cup fresh cilantro, 4 garlic cloves, 1 small onion (quartered), 1 teaspoon cumin, 1 teaspoon coriander, 1/2 teaspoon cayenne pepper, 1 teaspoon salt, and 1/2 teaspoon black pepper. Pulse until the mixture is finely ground but not paste-like.

## Step 3: Form Falafel Patties
Transfer the mixture to a bowl. Add 1-2 tablespoons of flour if the mixture feels too wet. Let rest for 15-30 minutes in the refrigerator to firm up. Shape into balls (about 1.5 inches) or flatten slightly into patties.

## Step 4: Fry the Falafel
Heat 2-3 inches of oil in a deep pan to 350°F (175°C). Carefully lower falafel into hot oil in batches. Fry for 3-4 minutes until deep golden brown, turning occasionally. Drain on paper towels.

## Step 5: Make Tahini Sauce
Whisk 1/2 cup tahini paste with 1/4 cup lemon juice, 1 minced garlic clove, and 1/4 cup water. Add salt to taste. Thin with more water if needed. The sauce should be pourable but not runny.

## Step 6: Assemble the Wraps
Warm pita breads in a dry pan or microwave. Spread tahini sauce on each pita. Add shredded lettuce, diced tomatoes, sliced pickles, and red onion rings. Place 3-4 falafel balls in the center. Drizzle with more tahini sauce and hot sauce if desired. Roll tightly and serve immediately.',

            'Hummus Platter' => '
## Step 1: Prepare the Chickpeas
If using dried chickpeas, soak 1 cup overnight and cook in fresh water for 1 hour until very soft. For convenience, use 2 cans (15 oz each) of chickpeas, drained and rinsed. Reserve some whole chickpeas for garnish.

## Step 2: Blend the Base
In a food processor, combine the chickpeas, 1/4 cup tahini paste, juice of 1 large lemon (about 3 tablespoons), 2 minced garlic cloves, and 1/2 teaspoon salt. Process for 1 minute until combined.

## Step 3: Achieve Smooth Consistency
With the processor running, slowly drizzle in 2-3 tablespoons of extra virgin olive oil and 2-3 tablespoons of ice-cold water. The ice water helps create an incredibly smooth texture. Continue processing for 2-3 minutes, scraping down the sides occasionally, until very smooth and creamy.

## Step 4: Adjust Seasoning
Taste the hummus and adjust seasoning. Add more lemon juice for brightness, more tahini for richness, more garlic for intensity, or more salt to enhance flavors. Process again to incorporate.

## Step 5: Serve and Garnish
Transfer to a shallow serving bowl. Use the back of a spoon to create swirls and indentations. Drizzle generously with extra virgin olive oil. Sprinkle with a pinch of cumin and paprika. Top with reserved whole chickpeas and a sprig of parsley.

## Step 6: Accompaniments
Warm pita bread by wrapping in foil and heating in a 350°F oven for 10 minutes. Cut into triangles. Serve alongside fresh vegetables like carrot sticks, cucumber slices, bell pepper strips, and celery. Hummus can be refrigerated for up to 1 week in an airtight container.',

            // Thai Cuisine
            'Pad Thai' => '
## Step 1: Prepare the Noodles
Soak 8 ounces of dried rice noodles (medium width) in warm water for 30-45 minutes until pliable but still firm. Drain and set aside. Do not soak in hot water or they will become mushy.

## Step 2: Make the Pad Thai Sauce
In a small bowl, whisk together 3 tablespoons fish sauce, 3 tablespoons tamarind paste, 2 tablespoons brown sugar or palm sugar, and 1 tablespoon rice vinegar. Adjust to taste - the sauce should be a balance of sweet, sour, and salty.

## Step 3: Prepare the Ingredients
Press and drain 8 ounces of firm tofu, cut into 1-inch cubes. Peel and devein 8 ounces of shrimp. Beat 2 eggs with a pinch of salt. Chop 2 cloves of garlic, measure 1 cup of bean sprouts, chop 1/2 cup of green onions, and crush 1/4 cup of roasted peanuts.

## Step 4: Cook the Protein
Heat 2 tablespoons of oil in a wok over high heat. Add tofu and cook until golden, about 3 minutes. Remove and set aside. Add shrimp and cook for 2 minutes until pink. Remove and set aside.

## Step 5: Stir-fry the Noodles
Add more oil if needed. Crack eggs into the wok and scramble until just set. Add garlic and stir for 30 seconds. Add drained noodles and sauce. Toss constantly for 2-3 minutes until noodles are coated and tender. Add tofu, shrimp, and most of the bean sprouts. Toss for 1 minute.

## Step 6: Serve
Transfer to serving plates. Top with crushed peanuts, remaining bean sprouts, green onions, and lime wedges. Serve with additional condiments on the side: fish sauce, vinegar with chilies, sugar, and chili flakes. Pad Thai should be eaten immediately while hot.',

            'Green Curry' => '
## Step 1: Prepare the Ingredients
Cut 1.5 pounds of chicken thighs into bite-sized pieces. Slice 1 Thai eggplant into quarters (or substitute with 1 cup bamboo shoots). Have all ingredients ready before starting as the curry cooks quickly.

## Step 2: Prepare the Curry Base
Open 2 cans (13.5 oz each) of coconut milk. Do not shake the cans. Skim the thick cream from the top of one can (about 1/2 cup) and set aside. The remaining liquid will be used later.

## Step 3: Cook the Curry Paste
Heat a large pot or wok over medium heat. Add the reserved coconut cream and 3-4 tablespoons of green curry paste. Stir constantly for 2-3 minutes until the paste is fragrant and the oil begins to separate from the coconut cream.

## Step 4: Cook the Chicken
Add chicken pieces to the pot. Stir-fry for 3-4 minutes until the chicken is sealed on the outside. Add the remaining coconut milk (both cans). Bring to a gentle simmer.

## Step 5: Add Vegetables and Season
Add Thai eggplant or bamboo shoots. Simmer for 10-15 minutes until chicken is cooked through and vegetables are tender. Add 1 tablespoon fish sauce and 1 tablespoon palm sugar. Taste and adjust - add more fish sauce for saltiness, sugar for sweetness, or curry paste for heat.

## Step 6: Finish and Serve
Remove from heat and stir in 1 cup of fresh Thai basil leaves. Serve immediately over jasmine rice. The curry should be creamy, aromatic, and vibrant green. Garnish with sliced red chili and additional basil leaves. Thai green curry tastes even better the next day as flavors develop.',
        ];

        foreach ($detailedInstructions as $title => $instructions) {
            DB::table('recipes')
                ->where('title', $title)
                ->update(['detailed_instruction' => $instructions]);
        }

        $this->command->info('Detailed instructions updated for all recipes!');
    }
}