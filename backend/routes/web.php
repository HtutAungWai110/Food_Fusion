<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RecipesController;

Route::get('/', function () {
    // return response()->json([
    //     'message' => 'Welcome to the API',
    // ]);

    return response()->json([
        'message' => 'Welcome to the API',
    ]);
});

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/refresh-token', [AuthController::class, 'refreshToken']);

});

Route::prefix('user')->group(function () {
    Route::get('/info', [UserController::class, 'userInfo']);


});

Route::prefix('recipes')->group(function () {
    Route::get('/', [RecipesController::class, 'getRecipes']);
    Route::get('/search', [RecipesController::class, 'search']);
    Route::get("/popularRecipes", [RecipesController::class, "getPopularRecipes"]);
    Route::post("/likeRecipe", [RecipesController::class, "handleLike"])->middleware('auth');
    Route::get("/liked", [RecipesController::class, "checkLiked"])->middleware("auth");
});






