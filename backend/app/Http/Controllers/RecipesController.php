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

            return response()->json($query->get());
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch resources'
            ], 500);
        }
    }
}
