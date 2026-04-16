<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RecipesController;
use App\Http\Controllers\CommunityCookbookControlller;
use App\Http\Controllers\FeedbackController;

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
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/check-reset-session', [AuthController::class, 'checkResetSessoin']);

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

Route::prefix('community_cookbook')->group(function () {
    Route::get('/getPosts', [CommunityCookbookControlller::class, "getPosts"]);
    Route::post('/likePost', [CommunityCookbookControlller::class, "likePost"])->middleware('auth');
    Route::get('/isLiked', [CommunityCookbookControlller::class, "isLiked"])->middleware('auth');
    Route::post('/postComment', [CommunityCookbookControlller::class, "postComment"])->middleware('auth');
    Route::get('/getComments', [CommunityCookbookControlller::class, "getComments"]);
    Route::delete('/deleteComment', [CommunityCookbookControlller::class, "deleteComment"])->middleware('auth');
    Route::post('/uploadPost', [CommunityCookbookControlller::class, "createPost"])->middleware('auth');
});

Route::prefix('feedback')->group(function () {
    Route::post('/submit', [FeedbackController::class, 'submitFeedback']);



});





