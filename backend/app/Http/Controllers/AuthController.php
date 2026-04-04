<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email'     => 'required|string|email|',
            'password'  => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }

        $user = User::firstWhere('email', $request->input('email'));
        $passwordValid = Hash::check($request->input('password'), $user->password);
        if(!$user){
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);
        }

        if(!$passwordValid){
            $user->login_attempts = $user->login_attempts + 1;
            $user->save();
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);


        }

        $user->login_attempts = 0;
        $user->save();

        return response()->json([
            'message' => 'User login successfully',
            'user'    => $user
        ], 201);


    }

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


    }


}
