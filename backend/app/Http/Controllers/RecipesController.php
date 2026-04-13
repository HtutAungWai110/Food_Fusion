<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\RecipeLikes;
use Illuminate\Support\Str;

class RecipesController extends Controller
{
    //

    public function getRecipes(Request $req)
    {
        $cuisine = $req->query('cuisine');
        $difficulty = $req->query('difficulty');
        $title = $req->query('title');

        try {
            $query = Recipe::with("user:id,firstname,lastname,email");

            if ($cuisine && $cuisine !== 'All') {
                $query->where('cuisine', $cuisine);
            }

            if ($difficulty && $difficulty !== 'Any') {
                $query->where('difficulty', $difficulty);
            }

            if ($title && trim($title) !== '') {
                $query->whereRaw("MATCH(title) AGAINST(? IN NATURAL LANGUAGE MODE)", [$title]);
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
            if(!$recipe){
                return response()->json([
                    "message" => "Recipe not found"
                ], 404);
            }

            return response()->json( $recipe,201);


        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch resources'
            ], 500);
        }
    }

    public function getPopularRecipes(Request $req){
        try {
            $recipes = Recipe::orderBy("likes", 'desc')->limit(5)->get();

            return response()->json( $recipes,200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch resources'
            ], 500);
        }
    }

    public function handleLike(Request $req)
    {
        $userId = $req->attributes->get('user_id');
        $postId = $req->input('id');


        if (!$postId) {
            return response()->json([
                'message' => 'post_id is required'
            ], 400);
        }

        try {
            $recipe = Recipe::find($postId);
            if (!$recipe) {
                return response()->json([
                    'message' => 'Recipe not found'
                ], 404);
            }

            $existingLike = RecipeLikes::where('user_id', $userId)
                ->where('post_id', $postId)
                ->first();

            if ($existingLike) {
                $existingLike->delete();
                $recipe->decrement('likes');
                return response()->json([
                    'message' => 'Like removed',
                    'liked' => false
                ], 200);
            } else {
                RecipeLikes::create([
                    'id' => Str::uuid()->toString(),
                    'user_id' => $userId,
                    'post_id' => $postId,
                ]);
                $recipe->increment('likes');
            return response()->json([
                    'message' => 'Like added',
                    'liked' => true
                ], 201);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to process like'
            ], 500);
        }


    }

    public function checkLiked(Request $req){
        $userId = $req->attributes->get('user_id');
        $postId = $req->query('id');

        if (!$postId) {
            return response()->json([
                'message' => 'post_id is required'
            ], 400);
        }

        try {
            $isLiked = RecipeLikes::where('post_id', $postId)
            ->where('user_id', $userId)
            ->exists();


            return response()->json(["liked" => $isLiked],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!'
            ], 500);
        }

    }


}
