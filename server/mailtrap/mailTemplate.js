const verificationTemplate = (otp)=>{
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 400px; margin: 40px auto; background: linear-gradient(to bottom right, #f3e5f5, #ede7f6); padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); text-align: center;">
      <h2 style="margin-top: 0; color: #4a148c;">Verify Your Email</h2>
      <p style="color: #555;">Use the OTP below to verify your email address:</p>

      <div style="font-size: 28px; font-weight: bold; color: #ffffff; background: linear-gradient(90deg, #7b1fa2, #512da8); padding: 16px 32px; border-radius: 10px; display: inline-block; margin: 20px 0; letter-spacing: 4px;">
        ${otp}
      </div>

      <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes.</p>
      <p style="font-size: 12px; color: #999;">If you didn't request this, you can safely ignore this message.</p>
    </div>
  </body>
</html>
`
}

module.exports = {verificationTemplate}