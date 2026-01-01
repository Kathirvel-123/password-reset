// backend/src/sendMail.js - CORRECTED
const nodemailer = require("nodemailer");

console.log("ENV GMAIL:", process.env.GMAIL_USER, "PASS SET:", !!process.env.GMAIL_PASS);

const transporter = nodemailer.createTransport({  // ✅ createTransport (with 's')
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendMail(to, subject, html) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Email error:', error.message);
    return false;
  }
}

module.exports = sendMail;
