const express = require("express");
const router = express.Router();
const otpGen = require("otp-generator");
const nodemailer = require('nodemailer');
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD

// Store OTPs associated with user email addresses
const otpMap = {};

router.post("/send", async (request, response) => {
    const process = request.body.process;
    const email = request.body.email;
    
    const otp = otpGen.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });

    otpMap[email] = otp;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });

    var mailOptions = {
        from: EMAIL,
        to: email,
        subject: process === 'signup' ? 
                            "OTP for creating account on Melody Mingle" : 
                            "OTP to reset your account password on Melody Mingle",
        html: `<!DOCTYPE html>
            <html lang="en">
                <head><title>Sign-up</title></head>
                <body>
                    OTP for 
                    ${process === 'signup' ? 
                    'verifying your email on Melody Mingle' : 'updating your password on Melody Mingle'} 
                    is ${otp}
                </body>
            </html>`
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response.status(500).json({ error: "There was an error sending the OTP" });
        } else {
            response.status(200).json({ success: "OTP sent to your email" });
        }
    });
});

router.post("/verify", async (request, response) => {
    const email = request.body.email;
    const userOTP = request.body.otp;

    const storedOTP = otpMap[email];

    if (!storedOTP) {
        response.status(400).json({ error: "OTP not found for this email" });
    } else if (userOTP !== storedOTP) {
        response.status(400).json({ error: "Incorrect OTP" });
    } else {
        delete otpMap[email];
        response.status(200).json({ success: "OTP verified successfully" });
    }
});

module.exports = router;
