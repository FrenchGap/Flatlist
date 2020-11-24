<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'email', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error',
                'data' => $validator->errors()
            ], 401);
        }

        $user = new User([
            'fname' => request('fname'),
            'lname' => request('lname'),
            'email' => request('email'),
            'password' => Hash::make(request('password')),
        ]);
        $token = app(TokenController::class)->createToken($user);

        return response([
            'message' => 'Success',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    public function login(Request $request)
    {
        $user = User::where('email', request('email'))->first();
        if (is_null($user)) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }
        
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $token = app(TokenController::class)->createToken($user);
            return response()->json([
                'message' => 'Success',
                'token' => $token,
                'user' => $user
            ], 200);
        }
        else {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }
    }
}
