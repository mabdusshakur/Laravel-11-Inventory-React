<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    function loginPage()
    {
        return Inertia::render('Auth/LoginPage');
    }

    function registerPage()
    {
        return Inertia::render('Auth/RegisterPage');
    }

    function sendOtpPage()
    {
        return Inertia::render('Auth/SendOtpPage');
    }

    function verifyOtpPage()
    {
        return Inertia::render('Auth/VerifyOtpPage');
    }

    function resetPasswordPage()
    {
        return Inertia::render('Auth/ResetPasswordPage');
    }
}