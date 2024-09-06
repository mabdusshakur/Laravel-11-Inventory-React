<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\JWTToken;
use App\Mail\OTPMail;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Summary of userRegistration
     * @param StoreUserRequest $request The request object, for registration. contains the validation rules for user registration
     * @return Controller::sendSuccess| Controller::sendError
     * @throws \Throwable If an error occurs during the login process.
     */
    function userRegistration(StoreUserRequest $request)
    {
        try {
            $user = User::create($request->all());
            if (!$user) {
                return $this->sendError('User registration failed', 500);
            }
            return $this->sendSuccess('User registered successfully', $user, 201);
        } catch (\Throwable $th) {
            return $this->sendError('User registration failed', 500, $th->getMessage());
        }
    }
    /**
     * Logs in a user.
     *
     * @param LoginUserRequest $request The login user request object. Contains the validation rules for user login.
     *
     * @return Controller::sendSuccess| Controller::sendError. on success, it set a cookie with the token on the client side.
     *
     * @throws \Throwable If an error occurs during the login process.
     */

    function userLogin(LoginUserRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return $this->sendError('User not found', 200);
            }
            $auth = Auth::attempt(['email' => $request->email, 'password' => $request->password]);
            if (!$auth) {
                return $this->sendError('Invalid Password', 200);
            }

            $expiryTime = 60 * 60 * 24 * 30; // seconds * minutes * hours * days
            $token = JWTToken::createToken($user->email, $user->id, $expiryTime);

            if (!$token) {
                return $this->sendError('Token creation failed', 200);
            }

            return $this->sendSuccess('User logged in successfully', "")->cookie('token', $token, time() + $expiryTime);
        } catch (\Throwable $th) {
            return $this->sendError('User login failed', 200, $th->getMessage());
        }
    }

    /**
     * Summary of userLogout
     * @param \Illuminate\Http\Request $request
     * @return Controller::sendSuccess| Controller::sendError
     * - on success, it invalidates the token and clears the token from the cookie.
     * - on failure, it response with an error message. [ chances of failure are very low. ]
     */
    function userLogout(Request $request)
    {
        try {
            // Invalidate the token 
            $token = $request->cookie('token');
            if ($token) {
                JWTToken::invalidateToken($token);
            }
            // Clear the token from cookie
            return $this->sendSuccess('Logout Success', 'Logout Success')->cookie('token', '', -1);
        } catch (\Throwable $th) {
            return $this->sendError('User logout failed', 200, $th->getMessage());
        }
    }

    /**
     * Summary of getUser
     * @param \Illuminate\Http\Request $request
     * @return Controller::sendSuccess| Controller::sendError
     * - on success, it returns the user profile object.
     * - on failure, it response with an error message.
     */
    function getUser(Request $request)
    {
        try {
            $id = $request->headers->get('id');
            $user = User::findOrFail($id);
            return $this->sendSuccess('User profile fetched successfully.', $user);
        } catch (\Throwable $th) {
            return $this->sendError('User profile failed', 200, $th->getMessage());
        }
    }

    /**
     * Summary of updateUser
     * @param \Illuminate\Http\Request $request
     * @return Controller::sendSuccess| Controller::sendError
     *  - on success, it updates the user profile and response with a success message, and the updated user object.
     *  - on failure, it response with an error message.
     */
    function updateUser(Request $request)
    {
        try {
            $id = $request->headers->get('id');
            $user = User::findOrFail($id);
            $user->update($request->all());
            return $this->sendSuccess('User profile updated successfully.', $user);
        } catch (\Throwable $th) {
            return $this->sendError('User profile update failed', 200, $th->getMessage());
        }
    }

    /**
     * Summary of sendOtp
     * @param \Illuminate\Http\Request $request
     * @return Controller::sendSuccess| Controller::sendError
     * - on success, it sends the OTP to the user's email and saves it in the db OTP column associated with the user.
     * - on failure, it response with an error message.
     */
    function sendOtp(Request $request)
    {
        try {
            // validate the request
            $request->validate([
                'email' => 'required|email'
            ]);

            // find the user with the email
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return $this->sendError('User not found', 200);
            }
            // generate a random 4 digit number
            $otp = rand(1000, 9999);

            // set the otp in the user's otp column
            $user->otp = $otp;
            $user->save();

            // send the otp to the user's email
            $mail = Mail::to($user->email)->send(new OTPMail($user->otp));
            if (!$mail) {
                return $this->sendError('OTP sending failed', 200);
            }
            return $this->sendSuccess('OTP sent successfully', "");
        } catch (\Throwable $th) {
            return $this->sendError('OTP sending failed', 200, $th->getMessage());
        }
    }

    /**
     * Summary of verifyOtp
     * @param \Illuminate\Http\Request $request
     * @return Controller::sendSuccess| Controller::sendError
     *  - if the otp is valid, it resets the otp to 0 and sets a token in the user's cookie.
     *  - on failure, it response with an error message.
     */
    function verifyOtp(Request $request)
    {
        try {
            // validate the request
            $request->validate([
                'email' => 'required|email',
                'otp' => 'required|numeric|max_digits:4'
            ]);

            // get the email and otp from the request
            $email = $request->email;
            $otp = $request->otp;


            // find the user with the email
            $user = User::where('email', $email)->first();
            if (!$user) {
                return $this->sendError('User not found', 200);
            }

            // check if otp is expired or not - (1 minute)
            if ($user->updated_at->diffInMinutes(now()) > 1) {
                $user->otp = 0;
                $user->save();
                return $this->sendError('OTP expired, Go back and generate another Otp', 200);
            }

            // check if the otp is valid
            if ($user->otp != $otp) {
                return $this->sendError('Invalid OTP', 200);
            }

            // reset the otp to 0 of the user
            $user->otp = 0;
            $user->save();

            // create a token and set it in the cookie
            $expiry_time = 60 * 5; // 5 minutes
            $token = JWTToken::createToken($user->email, $user->id, $expiry_time);
            if (!$token) {
                return $this->sendError('Token creation failed', 200);
            }

            return $this->sendSuccess('OTP verified successfully', "")->cookie('token', $token, $expiry_time);

        } catch (\Throwable $th) {
            return $this->sendError('OTP verification failed', 200, $th->getMessage());
        }
    }

    /**
     * Summary of resetPassword
     * @param \Illuminate\Http\Request $request
     * @return Controller::sendSuccess| Controller::sendError
     * - on success, it resets the password of the user. and response with a success message and clears the token from the cookie.
     * - on failure, it response with an error message.
     */

    function resetPassword(Request $request)
    {
        try {
            // validate the request
            $request->validate([
                'password' => 'required|min:6'
            ]);

            // get the email and password from the request
            $email = $request->headers->get('email');
            $password = $request->password;

            // find the user with the email
            $user = User::where('email', $email)->first();
            if (!$user) {
                return $this->sendError('User not found', 200);
            }

            // reset the password of the user
            $user->password = Hash::make($password);
            $user->save();

            return $this->sendSuccess('Password reset successfully', "")->cookie('token', '', -1);
        } catch (\Throwable $th) {
            return $this->sendError('Password reset failed', 200, $th->getMessage());
        }
    }

}