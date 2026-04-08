<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;

class RecipesController extends Controller
{
    //

    public function getRecipes(Request $req)
    {
        $cuisine = $req->query('cuisine');
        $difficulty = $req->query('difficulty');

        try {
            $query = Recipe::query();

            if ($cuisine && $cuisine !== 'All') {
                $query->where('cuisine', $cuisine);
            }

            if ($difficulty && $difficulty !== 'Any') {
                $query->where('difficulty', $difficulty);
            }

            return response()->json($query->paginate(12));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch resources'
            ], 500);
        }
    }

    public function search(Request $req){
        $id = $req->query('id');

        try {
            $recipe = Recipe::find($id);
            // if(!$recipe){
            //     return response()->json([
            //         "message" => "Recipe not found"
            //     ], 404);
            // }

            return response()->json([
                "recipe" => $recipe
            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch resources'
            ], 500);
        }
    }
}
