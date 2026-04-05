<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

 public function userInfo(Request $req){
        $accessToken = $req->cookie('access_token');
        if(!$accessToken){
            return response()->json([
                'message' => 'Unauthorized - No tokens found',
            ], 401);
        }

        $payload = auth('api')->setToken($accessToken)->getPayload();
        $userId = $payload->get('sub');
        $user = User::find($userId);

        return response()->json([
            'user' => ['firstname'=>$user->firstname, 'lastname'=>$user->lastname, 'email'=>$user->email]
        ], 201);
    }
}
