<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;
use Carbon\Carbon;

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



        $accessToken = auth('api')->setTTL(config('jwt.ttl', 60))->tokenById($user->id);
        $refreshToken = auth('api')->setTTL(config('jwt.refresh_ttl', 20160))->tokenById($user->id);


        $user->login_attempts = 0;
        $user->save();

        $accessCookie = $this->createCookie('access_token', $accessToken, 60);
        $refreshCookie = $this->createCookie('refresh_token', $refreshToken, 20160);

        return response()->json([
            'message' => 'User login successfully',
            'user'    => $user,
        ], 201)->withCookie($accessCookie)->withCookie($refreshCookie)


        ;


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

    public function refreshToken(Request $request)
    {
        // Check if access_token exists in cookies
        $accessToken = $request->cookie('access_token');

        // If access_token exists and is valid, no refresh needed
        if ($accessToken) {
            try {
                $payload = auth('api')->setToken($accessToken)->getPayload();
                if ($payload && $payload->get('exp') > time()) {
                    return response()->json([
                        'message' => 'Access token is still valid',
                    ], 200);
                }
            } catch (\Exception $e) {
                // Token is invalid, proceed to check refresh token
            }
        }

        // Check for refresh_token in cookies
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json([
                'message' => 'Unauthorized - No tokens found',
            ], 401);
        }

        try {
            // Validate refresh token and get user
            $payload = auth('api')->setToken($refreshToken)->getPayload();
            $userId = $payload->get('sub');
            $user = User::find($userId);

            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized - User not found',
                ], 401);
            }

            // Generate new access token
            $newAccessToken = auth('api')->setTTL(config('jwt.ttl', 60))->tokenById($user->id);

            // Create new access token cookie
            $accessCookie = $this->createCookie('access_token', $newAccessToken, 60);

            return response()->json([
                'message' => 'Token refreshed successfully',
                'user'    => $user,
            ], 200)->withCookie($accessCookie);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unauthorized - Invalid refresh token',
            ], 401);
        }
    }

    private function createCookie($name, $token, $minutes)
    {
        return cookie(
            $name,
            $token,
            $minutes,
            null,
            null,
            true,  // Secure
            true,  // HttpOnly
            false,
            'Lax'  // SameSite
        );
    }


}
