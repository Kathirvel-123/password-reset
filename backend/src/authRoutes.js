const router = require("express").Router();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require('nodemailer');  // ✅ CORRECT IMPORT

// ✅ FIXED: createTransport (NOT createTransporter)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dbsample64@gmail.com',           // ✅ YOUR GMAIL
    pass: 'ivbinushxjnmzdgk'               // ✅ YOUR APP PASSWORD
  }
});

// ✅ REGISTER (SAME)
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

// ✅ LOGIN (SAME)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
    console.log(`✅ User logged in: ${email}`);
    res.json({ message: "Login successful!", user: { name: user.name, email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ FORGOT PASSWORD - REAL GMAIL
router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(`🔍 Forgot password request for: ${email}`);
    
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ 
        email, 
        name: email.split('@')[0], 
        password: bcrypt.hashSync('dummy', 12),
        resetToken: null, 
        resetExpires: null 
      });
      await user.save();
      console.log(`✅ Created new user: ${email}`);
    }

    const token = crypto.randomBytes(16).toString("base64url").slice(0, 32);
    user.resetToken = token;
    user.resetExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const link = `http://localhost:3000/reset-password?token=${token}`;
    
    // ✅ SEND REAL EMAIL
    const mailOptions = {
      from: '"Password Reset" <dbsample64@gmail.com>',
      to: email,
      subject: '🔑 Password Reset - SecurePass',
      html: `
        <h2>🔑 Reset Your Password</h2>
        <p>Click <a href="${link}" style="color: #4f46e5; text-decoration: none; padding: 10px 20px; background: #4f46e5; color: white; border-radius: 5px;">Reset Password</a></p>
        <p><strong>Direct link:</strong> ${link}</p>
        <hr>
        <small>This link expires in 24 hours.</small>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`✅ REAL EMAIL SENT from dbsample64@gmail.com to ${email}`);
    
    res.json({ message: "Reset link sent to your email!" });
    
  } catch (error) {
    console.error("❌ Forgot error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ RESET (SAME)
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
    res.json({ message: "Password changed! Redirecting to login..." });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
