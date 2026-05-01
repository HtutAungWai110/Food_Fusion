<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Models\User;
use App\Models\CommunityCookbook;
use App\Models\MyCookbook;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class UserController extends Controller
{

 public function userInfo(Request $req){

        $userId = $this->getUserIdFromCookie($req);
        if($userId){
        $user = User::find($userId);

        return response()->json([
            'user' => ['firstname'=>$user->firstname, 'lastname'=>$user->lastname, 'email'=>$user->email, 'image_url' => $user->getImageUrlAttribute()]
        ], 201);
        }
        return response()->json(null, 201);
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

    public function getUserPosts(Request $req){
        $userId = $req->attributes->get('user_id');

        try {
            $posts = CommunityCookbook::where('user_id', $userId)->with('user:id,firstname,lastname,email,image_path')
            ->withExists(['likes as isLiked' => function($query) use ($userId){
                    $query->where('user_id', $userId);
                }] )
            ->orderBy('created_at', 'desc')->paginate(10);

            foreach ($posts as $post){
                    $post->setAttribute('modifiable', $userId == $post->user_id);
            }


            return response()->json($posts, 200);


        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch posts'
            ], 500);
        }
    }

    public function addToMycookbook(Request $req){
        $userId = $req->attributes->get('user_id');
        $recipeId = $req->query("id");

        $validator = Validator::make($req->all(), [
            'userId' => 'string',
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
        return response()->json([
            'message' => 'Validation failed',
            'errors'  => $validator->errors()
        ], 422);
        }

        try {
            $recipeExist = MyCookbook::where([
                'recipe_id' => $recipeId,
                'user_id'=> $userId
            ])->first();

            if($recipeExist){
                $recipeExist->delete();

                return response()->json([
                    "message" => "Recipe removed from cookbook",
                    "added" => false
                ], 200);
            } else {
                MyCookbook::create([
                    "recipe_id" => $recipeId,
                    "user_id" => $userId
                ]);

                return response()->json([
                    "message" => "Recipe added to cookbook",
                    "added" => true,
                    "newRecipe" => MyCookbook::where([
                        "user_id" => $userId,
                        "recipe_id" => $recipeId,
                    ])
                    ->with("recipe")
                    ->first()
                ], 201);
            }


        } catch (\Exception $e) {
            return response()->json([
                'message' => "Operation failed",
            ], 500);
        }

    }

    public function getMyCookbook(Request $req){
        $userId = $this->getUserIdFromCookie($req);
        try {
            $myCookBook = MyCookbook::where([
                "user_id" => $userId
            ])
            ->with("recipe")
            ->get()
            ->pluck("recipe");

            return response()->json($myCookBook, 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to fetch resources",
            ], 500);
        }
    }


    public function updateProfile(Request $req){
        $userId = $req->attributes->get("user_id");
        $data = $req->all();

        $validator = Validator::make($req->all(), [
            'firstname'     => 'string',
            'lastname'     => 'string',
            'email'     => 'string|email',
            'password'  => 'string|min:8',
        ]);

          if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }


        $user = User::find($userId);
        $passwordValid = Hash::check($req->input('password'), $user->password);
        if(!$passwordValid){
            return response()->json([
                'message' => 'Invalid email or password',
            ], 400);
        }

        if(trim($user->firstname) != trim($data['firstname'])) {
            $user->firstname = $data['firstname'];
        }
        if(trim($user->lastname) != trim($data['lastname'])) {
            $user->lastname = $data['lastname'];
        }
        if(trim($user->email) != trim($data['email'])) {
            $emailExist = User::where([
                "email" => $data['email']
            ])->first();
            if($emailExist){
                return response()->json([
                'message' => 'User already exist with this email!',
            ], 400);
            }
            $user->email = $data['email'];
        }
        $user->save();
        return response()->json($user, 200);




    }

     private function getUserIdFromCookie(Request $req){
        $accessToken = $req->cookie('access_token');
        if ($accessToken) {
                $payload = auth('api')->setToken($accessToken)->getPayload();
                $userId = $payload->get('sub');
                return $userId;
        }

        return null;
    }
}
