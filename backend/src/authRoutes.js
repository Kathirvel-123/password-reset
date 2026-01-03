const router = require("express").Router();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require('nodemailer');

// ✅ PRODUCTION READY: Use ENV vars
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// ✅ MAILJET SMTP (Render/Netlify compatible - Gmail often blocked)[web:20][web:21][web:24]
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  secure: false,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY  // Your new key
  }
});


// ✅ REGISTER - Production ready
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const hash = await bcrypt.hash(password, 12);
    user = new User({ name, email, password: hash });
    await user.save();
    
    console.log(`✅ User registered: ${email}`);
    res.json({ message: "User registered successfully! Please login." });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ LOGIN - Fixed bcrypt.compare(string, hash)[web:27]
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const plain = String(password ?? ""); // Ensure string input[web:27]

    if (!user || !(await bcrypt.compare(plain, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log(`✅ User logged in: ${email}`);
    res.json({ message: "Login successful!", user: { name: user.name, email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ FORGOT PASSWORD - Single route, no duplicates, auto-creates user if missing[web:26]
router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(`🔍 Forgot password request for: ${email}`);
    
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ 
        email, 
        name: email.split('@')[0], 
        password: await bcrypt.hash('temporary', 12),  // Valid dummy hash
        resetToken: null, 
        resetExpires: null 
      });
      await user.save();
      console.log(`✅ Created new user: ${email}`);
    }

    const token = crypto.randomBytes(16).toString("base64url").slice(0, 32); // Shorter secure token[web:26]
    user.resetToken = token;
    user.resetExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // ✅ Send email with dynamic frontend URL
    const link = `${frontendUrl}/reset-password?token=${token}`;
    const mailOptions = {
      from: "Password Reset <onboarding@resend.dev>",
      to: email,
      subject: '🔑 Password Reset - SecurePass',
      html: `
        <h2>🔑 Reset Your Password</h2>
        <p>Click <a href="${link}" style="color: white; text-decoration: none; padding: 10px 20px; background: #4f46e5; border-radius: 5px; font-weight: bold;">Reset Password</a></p>
        <p><strong>Direct link:</strong> ${link}</p>
        <hr>
        <small>This link expires in 24 hours. If you didn't request this, ignore.</small>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`✅ EMAIL SENT to ${email} → Check Mailjet dashboard!`);
    res.json({ message: "Reset link sent to your email!" });
  } catch (error) {
    console.error("❌ Forgot error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ RESET PASSWORD - Token validation + cleanup
router.post("/reset", async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetExpires: { $gt: Date.now() },
    });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid/expired reset link" });
    }

    const hash = await bcrypt.hash(password, 12);
    user.password = hash;
    user.resetToken = undefined;
    user.resetExpires = undefined;
    await user.save();

    console.log(`✅ Password reset for: ${user.email}`);
    res.json({ message: "Password changed! Please login with new password." });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
