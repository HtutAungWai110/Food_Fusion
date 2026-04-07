<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;

class RecipesController extends Controller
{
    //

    public function getRecipes(Request $req){
        try {
            $recipes = Recipe::all();

            return response()->json($recipes);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Failded to fetch resources"
            ], 500);
        }

    }
}
