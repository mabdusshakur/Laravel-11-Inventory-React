<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Login - {{ config('app.name') }}</title>
    <style>
        body {
            font-family: Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border: 0;
            border-spacing: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: rgb(239, 239, 239);
        }

        td {
            padding: 1rem 2rem;
            vertical-align: top;
            width: 100%;
            text-align: center;
        }

        .container {
            max-width: 600px;
            border-collapse: collapse;
            border: 0;
            border-spacing: 0;
            text-align: left;
            margin: 0 auto;
        }

        .logo {
            padding-bottom: 20px;
        }

        .content {
            padding: 20px;
            background-color: rgb(255, 255, 255);
        }

        h1 {
            margin: 1rem 0;
        }

        .footer {
            padding-top: 20px;
            color: rgb(153, 153, 153);
            text-align: center;
        }
    </style>
</head>

<body>
    <table role="presentation">
        <tbody>
            <tr>
                <td>
                    <div class="container">
                        <div class="content">
                            <div style="color: rgb(0, 0, 0); text-align: left;">
                                <h1>Verification Code</h1>
                                <p><strong style="font-size: 130%">{{ $otp }}</strong></p>
                                <p>If you didn’t request this, you can ignore this email.</p>
                                <p>Thanks,<br>From {{ config('app.name') }} </p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
