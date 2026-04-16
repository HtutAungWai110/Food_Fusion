<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    //


    public function submitFeedback(Request $request)
    {
        $accessToken = $request->cookie('access_token');
        $validatedData = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        try {
            $userId = null;

            if ($accessToken) {
                $payload = auth('api')->setToken($accessToken)->getPayload();
                $userId = $payload->get('sub');
            }

            $feedback = Feedback::create([
                'user_id' => $userId,
                'firstname' => $validatedData['firstname'],
                'lastname' => $validatedData['lastname'],
                'email' => $validatedData['email'],
                'message' => $validatedData['message'],
            ]);

            return response()->json([
                'message' => 'Feedback submitted successfully',
                'data' => $feedback,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit feedback',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
