<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; border-radius: 8px; padding: 30px; margin-top: 20px;">
        <h1 style="color: #2d3748; margin-bottom: 20px;">Password Reset Request</h1>

        <p style="margin-bottom: 20px;">Hello,</p>

        <p style="margin-bottom: 20px;">We received a request to reset your password for your Food Fusion account associated with <strong>{{ $email }}</strong>.</p>

        <p style="margin-bottom: 25px;">Click the button below to reset your password:</p>

        <a href="{{ $resetUrl }}"
           style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Reset Password
        </a>

        <p style="margin-top: 25px; font-size: 14px; color: #666;">
            This link will expire in <strong>1 hour</strong> for security reasons.
        </p>

        <p style="margin-top: 20px; font-size: 14px; color: #666;">
            If you did not request a password reset, please ignore this email. Your password will remain unchanged.
        </p>

        <p style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #999;">
            If the button above doesn't work, copy and paste this URL into your browser:<br>
            <a href="{{ $resetUrl }}" style="color: #4f46e5; word-break: break-all;">{{ $resetUrl }}</a>
        </p>
    </div>

    <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
        &copy; {{ date('Y') }} Food Fusion. All rights reserved.
    </p>
</body>
</html>