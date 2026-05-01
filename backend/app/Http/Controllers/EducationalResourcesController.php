<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\EducationalResource;
use Illuminate\Support\Facades\Storage;

class EducationalResourcesController extends Controller
{
    //

    public function getEducationalResources(Request $req){
        try {
            $resources = EducationalResource::with("user:id,firstname,lastname,email")
            ->get();
            return response()->json($resources);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Failed to fetch resources"
            ], 500);
        }
    }


}
