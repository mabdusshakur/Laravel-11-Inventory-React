<?php

namespace App\Http\Middleware;

use App\Helpers\JWTToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TokenVerificationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    /*
     * TokenVerificationMiddleware class
     * This middleware is responsible for verifying the token in the request cookie.
     * If the token is valid, it sets the email and id headers in the request and allows the request to proceed.
     * If the token is invalid or missing, it returns a 401 Unauthorized response.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('token');
        $decoded = JWTToken::decodeToken($token);
        if ($decoded == "Unauthorized") {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->headers->set('email', $decoded->email);
        $request->headers->set('id', $decoded->id);
        return $next($request);
    }
}