<?php

namespace App\Http\Controllers;
use App\Models\ExpoToken;

use Illuminate\Http\Request;

class ExpoTokenController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        'users_id' => 'required|exists:users,id',
        ]);

        ExpoToken::updateOrCreate(
            ['users_id' => $request->users_id, 'expo_token' => $request->token]
        );

        return response()->json(['message' => 'Expo token stored successfully'], 200);
    }
}
