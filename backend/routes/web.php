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
    Route::get('/info', [UserController::class, 'userInfo'])->middleware('tokenCheck');
    Route::post('/uploadAvatar', [UserController::class, 'uploadAvatar'])->middleware(['tokenCheck', 'auth']);
    Route::get('/getPosts', [UserController::class, 'getUserPosts'])->middleware(['tokenCheck', 'auth']);
    Route::post('/addToMycookbook', [UserController::class, 'addToMycookbook'])->middleware(['tokenCheck', 'auth']);
    Route::get('/getMyCookbook', [UserController::class, 'getMyCookbook'])->middleware(['tokenCheck', 'auth']);
    Route::put('/updateProfile', [UserController::class, 'updateProfile'])->middleware(['tokenCheck', 'auth']);
});

Route::prefix('recipes')->group(function () {
    Route::get('/', [RecipesController::class, 'getRecipes']);
    Route::get('/search', [RecipesController::class, 'search'])->middleware('tokenCheck');
    Route::get("/popularRecipes", [RecipesController::class, "getPopularRecipes"]);
    Route::post("/likeRecipe", [RecipesController::class, "handleLike"])->middleware(['tokenCheck', 'auth']);
    Route::get("/liked", [RecipesController::class, "checkLiked"])->middleware(['tokenCheck', 'auth']);
    Route::get("/cards", [RecipesController::class, "getDownladableRecipes"]);
});

Route::prefix('community_cookbook')->group(function () {
    Route::get('/getPosts', [CommunityCookbookControlller::class, "getPosts"])->middleware('tokenCheck');
    Route::get('/getPost', [CommunityCookbookControlller::class, "getPost"])->middleware('tokenCheck');
    Route::post('/likePost', [CommunityCookbookControlller::class, "likePost"])->middleware(['tokenCheck', 'auth']);
    Route::get('/isLiked', [CommunityCookbookControlller::class, "isLiked"])->middleware(['tokenCheck', 'auth']);
    Route::post('/postComment', [CommunityCookbookControlller::class, "postComment"])->middleware(['tokenCheck', 'auth']);
    Route::get('/getComments', [CommunityCookbookControlller::class, "getComments"])->middleware('tokenCheck');
    Route::delete('/deleteComment', [CommunityCookbookControlller::class, "deleteComment"])->middleware(['tokenCheck', 'auth']);
    Route::post('/uploadPost', [CommunityCookbookControlller::class, "createPost"])->middleware(['tokenCheck', 'auth']);
    Route::put('/updateComment', [CommunityCookbookControlller::class, "updateComment"])->middleware(['tokenCheck', 'auth']);
    Route::delete('/deletePost', [CommunityCookbookControlller::class, "deletePost"])->middleware(['tokenCheck', 'auth']);

});

Route::prefix('feedback')->group(function () {
    Route::post('/submit', [FeedbackController::class, 'submitFeedback']);
});





