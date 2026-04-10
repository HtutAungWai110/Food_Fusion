<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\PasswordResetToken;
use App\Mail\PasswordResetEmail;
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




        if ($user->lockout_until && $user->lockout_until > now()) {
            $minutesLeft = round(now()->diffInMinutes($user->lockout_until));

            return response()->json([
                'message' => "Your account is temporarily locked. Try again after {$minutesLeft} minutes."
            ], 403);
        }


        if ($user->lockout_until && $user->lockout_until <= now()) {
            $user->update([
                'lockout_until' => null,
                'login_attempts' => 0,
            ]);
        }

        if($user->login_attempts >= 5){
            $user->update([
                'lockout_until' => now()->addMinutes(15)
            ]);

            return response()->json([
                'message' => "Your account is temporarily locked. Try again after 15 minutes."
            ], 401);
        }

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


        if($passwordValid){
            if($user->login_attempts > 0){
                $user->update([
                    "login_attempts" => 0,

                ]);
            }
            $accessToken = auth('api')->setTTL(config('jwt.ttl', 60))->tokenById($user->id);
            $refreshToken = auth('api')->setTTL(config('jwt.refresh_ttl', 20160))->tokenById($user->id);


            $accessCookie = $this->createCookie('access_token', $accessToken, 60);
            $refreshCookie = $this->createCookie('refresh_token', $refreshToken, 20160);

            return response()->json([
                'message' => 'User login successfully',
                'user'    => $user,
            ], 201)->withCookie($accessCookie)->withCookie($refreshCookie);


        }


    }

    public function register(Request $request)
    {

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

    /**
     * Send password reset link to user's email.
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        // Always return success to prevent email enumeration
        if (!$user) {
            return response()->json([
                'message' => 'User does not exist with this email',
            ], 404);
        }

        // Delete any existing reset tokens for this email
        PasswordResetToken::deleteByEmail($email);

        // Generate a secure random token
        $plainToken = Str::random(64);

        // Store hashed token in database
        PasswordResetToken::create([
            'email' => $email,
            'token' => Hash::make($plainToken),
            'created_at' => now(),
            'expires_at' => now()->addHour(),
        ]);

        // Send email with the plain token (not hashed)
        Mail::to($email)->send(new PasswordResetEmail($email, $plainToken));

        return response()->json([
            'message' => "A password reset link has been sent.",
        ], 200);
    }

    /**
     * Reset user password using token from email.
     */
    public function resetPassword(Request $request)
    {
        // Get token and email from query params or body
        $token = $request->input('token') ?? $request->query('token');
        $email = $request->input('email') ?? $request->query('email');
        $password = $request->input('password');

        $validator = Validator::make([
            'token' => $token,
            'email' => $email,
            'password' => $password,
        ], [
            'token' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Find the reset token record
        $resetToken = PasswordResetToken::where('email', $email)->first();

        if (!$resetToken) {
            return response()->json([
                'message' => 'Invalid or expired password reset token.',
            ], 400);
        }

        // Check if token is expired
        if ($resetToken->isExpired()) {
            PasswordResetToken::deleteByEmail($email);
            return response()->json([
                'message' => 'Password reset token has expired. Please request a new one.',
            ], 400);
        }

        // Verify the token hash
        if (!Hash::check($token, $resetToken->token)) {
            return response()->json([
                'message' => 'Invalid password reset token.',
            ], 400);
        }

        // Find user and update password
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        // Update password
        $user->password = Hash::make($password);
        $user->save();

        // Delete used token
        PasswordResetToken::deleteByEmail($email);

        // Reset login attempts and lockout if any
        $user->update([
            'login_attempts' => 0,
            'lockout_until' => null,
        ]);

        return response()->json([
            'message' => 'Password has been reset successfully.',
        ], 200);
    }

    public function checkResetSessoin(Request $request){
        $token = $request->input('token') ?? $request->query('token');
        $email = $request->input('email') ?? $request->query('email');

           $validator = Validator::make([
            'token' => $token,
            'email' => $email,
        ], [
            'token' => 'required|string',
            'email' => 'required|string|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $resetToken = PasswordResetToken::where('email', $email)->first();

        if (!$resetToken) {
            return response()->json([
                'message' => 'Invalid or expired password reset token.',
            ], 400);
        }

        if ($resetToken->isExpired()) {
            PasswordResetToken::deleteByEmail($email);
            return response()->json([
                'message' => 'Password reset token has expired. Please request a new one.',
            ], 400);
        }


        if (!Hash::check($token, $resetToken->token)) {
            return response()->json([
                'message' => 'Invalid password reset token.',
            ], 400);
        }

        return response()->json([
            "tokenValid" => true
        ], 200);
    }


}
