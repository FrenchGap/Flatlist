<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TokenController extends Controller
{
    public function update(Request $request)
    {
        $token = Str::random(60);

        $request->user()->forceFill([
            'api_token' => hash('sha256', $token),
        ])->save();

        return response([
            'message' => 'Success',
            'token' => $token,
        ], 200);
    }

    public function createToken($user)
    {
        $token = Str::random(60);

        $user->forceFill([
            'api_token' => hash('sha256', $token),
        ])->save();

        return $token;
    }
}
