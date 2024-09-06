<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    function loginPage()
    {
        return view('auth.login-page');
    }

    function registerPage()
    {
        return view('auth.register-page');
    }

    function sendOtpPage()
    {
        return view('auth.send-otp-page');
    }

    function verifyOtpPage()
    {
        return view('auth.verify-otp-page');
    }

    function resetPasswordPage()
    {
        return view('auth.reset-password-page');
    }
}