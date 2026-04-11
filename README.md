# 🔐 MERN Advanced Authentication
A full-stack authentication system built with the MERN stack featuring email verification, password reset, and JWT-based authentication.
## 🌐 Live Demo

- Frontend: https://reset-password-front.netlify.app
- Backend API: https://password-reset-wlxq.onrender.com


## ✨ Features

- ✅ User Signup with Email Verification
- ✅ Login / Logout
- ✅ JWT Authentication with HTTP-only Cookies
- ✅ Forgot Password via Email
- ✅ Reset Password with Token
- ✅ Protected Routes
- ✅ Responsive UI with Tailwind CSS
- ✅ Real Email Delivery via Resend


## 🛠️ Tech Stack
### Frontend

- React.js (Vite)
- Tailwind CSS
- Zustand (State Management)
- Axios
- React Router DOM
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JSON Web Token (JWT)
- Resend (Email Service)
- bcryptjs
- cookie-parser
---
```
📁 Project Structure
├── backend/                  # Backend source (deployed on Render)
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── db/
│   │   └── connectDB.js
│   ├── mailtrap/
│   │   ├── emails.js
│   │   ├── emailTemplates.js
│   │   └── mailtrap.config.js
│   ├── middleware/
│   │   └── verifyToken.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── auth.route.js
│   ├── utils/
│   │   └── generateTokenAndSetCookie.js
│   └── index.js
│
└── frontend/                 # Frontend source (deployed on Netlify)
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── SignUpPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── EmailVerificationPage.jsx
    │   │   ├── ForgotPasswordPage.jsx
    │   │   ├── ResetPasswordPage.jsx
    │   │   └── DashboardPage.jsx
    │   ├── store/
    │   │   └── authStore.js
    │   └── App.jsx
    └── package.json
```
### ⚙️ Environment Variables
## Backend
- .env
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=https://your-netlify-app.netlify.app
RESEND_API_KEY=your_resend_api_key
```
---
## Frontend
- .env
```
VITE_API_URL=https://your-render-backend.onrender.com/api/auth
```
### 🚀 Getting Started Locally
Prerequisites

Node.js v18+
MongoDB Atlas account
Resend account

1. Clone the repository
```
bash
git clone https://github.com/YOUR_USERNAME/mern-advanced-auth.git
cd mern-advanced-auth
2. Install dependencies
bash# Backend
npm install
npm start or npm run build
```
###  frontend
```
npm run dev
Frontend runs at http://localhost:5173
Backend runs at http://localhost:5000
```
## 📡 API Endpoints
```
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/verify-email` | Verify email with OTP |
| POST | `/api/auth/forgot-password` | Send password reset email |
| POST | `/api/auth/reset-password/:token` | Reset password |
| GET  | `/api/auth/check-auth` | Check authentication status |
```
## 🔄 Auth Flow
Signup → Email Verification (OTP) → Dashboard
Login → Dashboard
Forgot Password → Email Link → Reset Password → Login

## 🚢 Deployment
Backend → Render

- Build Command: npm install
- Start Command: node index.js
Add all environment variables in Render dashboard

Frontend → Netlify

- Build the frontend locally: npm run build
Drag and drop dist folder to Netlify
Add _redirects file in public/ folder:

/*    /index.html   200
```
## 📧 Email Service
This project uses Resend for transactional emails:

- Email verification OTP
- Welcome email
- Password reset link
- Password reset success confirmation
```
---