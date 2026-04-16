<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CommunityCookbookLikes;
use App\Models\CommunityCookbookComment;
use App\Models\CommunityCookbook;
use Illuminate\Support\Facades\Validator;

class CommunityCookbookControlller extends Controller
{
    public function getPosts(){
        try {
        $posts = CommunityCookbook::with('user:id,firstname,lastname,email')
            ->orderBy('created_at', 'desc');
        return response()->json($posts->paginate(12), 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch resources'
            ], 500);
        }
    }

    public function likePost(Request $req){
        $userId = $req->attributes->get('user_id');
        $postId = $req->input('id');


         if (!$postId) {
            return response()->json([
                'message' => 'post_id is required'
            ], 400);
        }


        try {
            $post = CommunityCookbook::find($postId);
            if(!$post){
                return response()->json([
                    'message' => 'Post not found'
                ], 404);
            }

            $likeExist = CommunityCookbookLikes::where('user_id', $userId)->where('post_id', $postId)->first();
            if( $likeExist ){
                $likeExist->delete();
                $post->decrement('likes');
                return response()->json([
                    'message' => 'Like removed',
                    'liked' => false
                ], 200);
            } else {
                CommunityCookbookLikes::create([
                    "user_id"=>$userId,
                    "post_id"=>$postId
                ]);
                $post->increment('likes');

                return response()->json([
                    'message' => 'Like added',
                    'liked' => true
                ], 200);
            }


        }  catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch resources'
            ], 500);
        }
    }

    public function isLiked(Request $req){
        $userId = $req->attributes->get('user_id');
        $postId = $req->query('id');

         if (!$postId) {
            return response()->json([
                'message' => 'post_id is required'
            ], 400);
        }

        try {
            $isLiked = CommunityCookbookLikes::where('user_id', $userId)->where('post_id', $postId)->exists();
            return response() ->json([
                'liked' => $isLiked
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch resources'
            ], 500);
        }
    }


    public function postComment(Request $req){
        $userId = $req->attributes->get('user_id');
        $postId = $req->input('id');

        $validator = Validator::make($req->all(), [
            'comment' => 'required|string|max:500'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }


        try {
            $postExist = CommunityCookbook::find($postId);
            if(!$postExist){
                return response()->json([
                'message' => 'Post not found'
            ], 404);
            }

            CommunityCookbookComment::create([
                'user_id' => $userId,
                'post_id' => $postId,
                'comment' => $req->input('comment')
            ]);

            return response()->json([
                'message' => 'Comment added successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to add comment'
            ], 500);
        }
    }

    public function getComments(Request $req){
        $accessToken = $req->cookie('access_token');
        $postId = $req->query('id');

        if(!$postId){
            return response()->json([
                'message' => 'post_id is required'
            ], 400);
        }

        try {
            $userId = null;
            if ($accessToken) {
                $payload = auth('api')->setToken($accessToken)->getPayload();
                $userId = $payload->get('sub');
            }

            $comments = CommunityCookbookComment::where('post_id', $postId)
                ->with('user:id,firstname,lastname,email')
                ->get();


            foreach ($comments as $comment) {
                $comment->setAttribute('modifiable', $userId && $comment->user_id === $userId);
            }

            return response()->json($comments, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch comments'
            ], 500);
        }
    }

    public function deleteComment(Request $req){
        $userId = $req->attributes->get('user_id');
        $commentId = $req->query('id');
        $postId = $req->query('post_id');

        if(!$commentId){
            return response()->json([
                'message' => 'comment_id is required'
            ], 400);
        }

        try {
            $comment = CommunityCookbookComment::where('id', $commentId)->where('user_id', $userId)->where('post_id', $postId)->first();
            if(!$comment){
                return response()->json([
                    'message' => 'Comment not found'
                ], 404);
            }

            $comment->delete();
            return response()->json([
                'message' => 'Comment deleted successfully'
            ], 200);


        }catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to add comment'
            ], 500);
        }
    }

    public function createPost(Request $req){
        $userId = $req->attributes->get('user_id');

        $validator = Validator::make($req->all(), [
            'description' => 'required|string|max:1000',
            'image' => 'image|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }

        try {
            $image = $req->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = 'community_cookbook_images/' . $imageName;

            // Save directly to public/storage/community_cookbook_images
            $image->move(public_path('storage/community_cookbook_images'), $imageName);

            CommunityCookbook::create([
                'user_id' => $userId,
                'post_description' => $req->input('description'),
                'image_path' => $imagePath
            ]);

            return response()->json([
                'message' => 'Post created successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create post'
            ], 500);
        }
    }

}
