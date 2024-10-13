<?php

namespace App\Http\Controllers;

use App\Models\ExpoToken;
use App\Services\ExpoNotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $expoService;

    public function __construct(ExpoNotificationService $expoService)
    {
        $this->expoService = $expoService;
    }

    public function sendNotification(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'users_id' => 'required|exists:users,id',
        ]);

        $tokens = ExpoToken::where('users_id', $request->users_id)
            ->pluck('expo_token')
            ->toArray();

        if (count($tokens) > 0) {
            $message = [
                'title' => $request->title,
                'body' => $request->body,
            ];

            $response = $this->expoService->sendNotification($tokens, $message);

            return response()->json($response);
        }

        return response()->json(['error' => 'No tokens found for this user'], 404);
    }
}
