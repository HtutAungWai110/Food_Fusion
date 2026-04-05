<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

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






