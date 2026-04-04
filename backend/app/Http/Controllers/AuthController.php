<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //

    public function register(Request $request)
    {
        // 1. Validation (Like using Joi or Zod in Express)
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname'  => 'required|string|max:255',
            'email'     => 'required|string|email|unique:users',
            'password'  => 'required|string|min:8',
        ]);



        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }



        // // 2. Create User (Hash::make is like bcrypt.hash)
        $user = User::create([
            'firstname' => $request->input('firstname'),
            'lastname'  => $request->input('lastname'),
            'email'     => $request->input('email'),
            'password'  => Hash::make($request->input('password')),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user'    => $user
        ], 201);

        // return response()->json([
        //     'message' => 'User registered successfully',
        //     'data' => $data
        // ], 201);
    }
}
