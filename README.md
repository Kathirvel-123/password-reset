## 🚀 Password Reset System
 Password Reset + Full Auth System
 Production-Ready MERN Auth System
Complete user authentication with secure password reset, modern glassmorphism UI, and full-stack deployment. Features register, login, forgot password, reset, and confetti dashboard with purple gradient theme matching "Send Reset Link" style.

---
## ✨ Live Demo

- Frontend	password-reset007.netlify.app ✅ LIVE
- Backend	password-reset-kjnx.onrender.com ✅ LIVE
- GitHub Kathirvel-123/password-reset
- password-reset-kjnx.onrender.com ✅ LIVE	Kathirvel-123/password-reset
- Test with any email → Instant reset link → Full flow working!
​
---
## 🎯 Features ✅

-  Forgot Password → Email Reset Link (15min expiry)
-  Secure Token Validation → bcrypt Password Hashing
-  Glassmorphism UI → Purple Gradient Theme
-  Confetti Dashboard → Login Success Celebration
-  Fully Responsive → Mobile/Tablet/Desktop
-  Gmail Integration → Real Email Delivery
-  MongoDB Atlas → Production Ready DB
---
## 🛠️ Tech Stack
- Frontend: React 18 + React Router + Tailwind CSS + Font Awesome
- Backend: Node.js 18 + Express + bcrypt + Nodemailer
- Database: MongoDB + Mongoose
- Deployment: Netlify (Frontend) + Render (Backend)
- Auth: JWT Tokens + Email Verification
-  Quick Test (1 Minute)
- Click Frontend URL → /forgot-password
---
## Enter ANY email (creates user auto)

- Check YOUR Gmail → Click reset link

- Set new password → Login →  Dashboard confetti!

- Demo email: test@example.com → Check your Gmail inbox!
---
## 🏗️ Folder Structure
```
password-reset/
├── backend/                          ← Full Auth API
│   ├── models/User.js
│   ├── routes/auth.js               ← /register /login /forgot /reset
│   ├── server.js
│   └── package.json
├── frontend/                         ← React SPA
│   ├── public/
│   │   ├── logo192.png             ← App icon
│   │   └── manifest.json           ← PWA
│   ├── src/
│   │   ├── components/AuthLayout.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       ← Confetti
│   │   │   ├── Register.jsx        ← NEW: User signup
│   │   │   ├── Login.jsx           ← Purple theme
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── App.jsx
│   │   └── index.css              ← Glassmorphism
│   └── package.json
└── README.md

```
---
## 🔧 Local Setup
```
Backend
cd backend
npm install
cp .env.example .env  # Add MongoDB URI + Gmail creds
npm start
```
## Frontend (new terminal)
```
cd frontend  
npm install
npm start
.env Files
Backend .env:
```
```
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/passwordreset
GMAIL_USER=yourgmail@gmail.com
GMAIL_PASS=your-16-char-app-password
FRONTEND_URL=http://localhost:3000
Frontend .env:

REACT_APP_BACKEND_URL=http://localhost:5000
```
---
## 📧 Email Setup (Gmail)
- Enable 2FA → Google Account → Security

- App Passwords → Generate → Copy 16 chars

- Paste in GMAIL_PASS → Works instantly!

- Sends from YOUR Gmail → To ANY recipient email.
---
## 🧪 API Endpoints ✅
```
Method  URL                           Description              Status
POST    /api/auth/register           Create new user           ✅ LIVE
POST    /api/auth/login              User login + JWT          ✅ LIVE  
POST    /api/auth/forgot             Send reset email          ✅ LIVE
POST    /api/auth/reset              Reset password (token)    ✅ LIVE
```
## 📱 Responsive Design
✅ Desktop (1920+) | ✅ Tablet (768-991) | ✅ Mobile (320-575)
---
## 🎨 UI Features
- Glassmorphism cards + backdrop blur

- Purple gradient buttons (Send Reset Link style)

- Font Awesome icons everywhere

- Hover animations + loading spinners

- Confetti explosion on login success
---
## 🐛 Troubleshooting
- Issue	Solution
- Email timeout	Render free tier → Copy token from logs
- CORS error	Restart servers
- Token expired	Request new (15min expiry)
- Mongo connect	Check Atlas IP whitelist
## 📊 Database Schema
```
{
  email: "String (unique)",
  password: "String (bcrypt)",
  resetToken: "String",
  resetExpiry: "Date"
}
```
## 🔒 Security
- bcrypt (12 rounds)

- JWT tokens (15min)

- Email verification

- Input sanitization

---