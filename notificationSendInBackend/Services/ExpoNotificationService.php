<?php

namespace App\Services;

use GuzzleHttp\Client;

class ExpoNotificationService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function sendNotification($tokens, $message, $data = [])
    {
        $url = 'https://exp.host/--/api/v2/push/send';
        $payload = [];

        foreach ($tokens as $token) {
            $payload[] = [
                'to' => $token,
                'sound' => 'default',
                'title' => $message['title'],
                'body' => $message['body'],
                'data' => (object) $data,
            ];
        }

        try {
            $response = $this->client->post($url, [
                'json' => $payload,
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
