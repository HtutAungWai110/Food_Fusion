<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        try {
            $token = $request->cookie('access_token');

            if (!$token) {
                return response()->json([
                    'message' => 'Access token required'
                ], 401);
            }

            $payload = JWTAuth::setToken($token)->getPayload();
            $userId = $payload->get('sub');

            if (!$userId) {
                return response()->json([
                    'message' => 'Invalid token'
                ], 401);
            }

            $user = \App\Models\User::find($userId);

            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 401);
            }

            $request->attributes->set('user_id', $userId);

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
