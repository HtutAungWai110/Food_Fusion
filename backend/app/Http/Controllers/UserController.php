<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
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
            'user' => ['firstname'=>$user->firstname, 'lastname'=>$user->lastname, 'email'=>$user->email, 'image_url' => $user->getImageUrlAttribute()]
        ], 201);
    }
    public function  uploadAvatar(Request $req){
        $userId = $req->attributes->get('user_id');
        $base64Image = $req->input('base64Image');


        try {

        $image_service_str = substr($base64Image, strpos($base64Image, ",") + 1);
        $image_data = base64_decode($image_service_str);

        $fileName = 'user_avatars/' . Str::random(20) . '.jpg';
        Storage::disk('public')->put($fileName, $image_data);

        $user = User::where('id', $userId)->first();

        if(!$user){
            return response()->json([
                'message' => 'No user found!',
            ], 400);
        }

        $user->image_path = $fileName;
        $user->last_updated_at = Carbon::now();
        $user->save();

        return response()->json([
            'message'=> 'Avatar uploaded successfully',
        ]);
        }catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to upload avatar'
            ], 500);
        }

    }
}
