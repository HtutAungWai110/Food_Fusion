<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;

class TokenCheckMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $accessToken = $request->cookie('access_token');

            if(!$accessToken){
                $refreshToken = $request->cookie('access_token');

                if($refreshToken){

                $payload = JWTAuth::setToken($refreshToken)->getPayload();
                $userId = $payload->get('sub');

                if (!$userId) {
                    return response()->json([
                        'message' => 'Invalid token'
                    ], 401);
                }

                $user = User::find($userId);

                if (!$user) {
                    return response()->json([
                        'message' => 'User not found'
                    ], 401);
                }
                $newAccessToken = auth('api')->setTTL(config('jwt.ttl', 60))->tokenById($user->id);




                Cookie::queue('access_token', $newAccessToken, 60, null, null, true, true, false, 'Lax' );

                $request->cookies->set('access_token', $newAccessToken);

                return $next($request);
                }

                return $next($request);

            }

            return $next($request);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                'message' => 'Token has expired'
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json([
                'message' => 'Invalid token'
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
    }
}
