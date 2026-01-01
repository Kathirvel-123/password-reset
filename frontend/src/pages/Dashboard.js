import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';
import AuthLayout from "../components/AuthLayout";

export default function Dashboard() {
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthLayout
      title={
        <>
          <i className="fas fa-check-circle me-2" style={{ fontSize: '1.3rem', color: '#10b981' }}></i>
          Login Successful!
        </>
      }
      subtitle="Welcome to your secure dashboard"
    >
      {/* 🎉 CONFETTI */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti 
            width={window.innerWidth} 
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={window.innerWidth > 768 ? 250 : 150}
            gravity={0.15}
          />
        </div>
      )}

      {/* ✅ WELCOME CARD */}
      <div className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 
                      border-2 border-emerald-400/40 backdrop-blur-xl shadow-2xl text-center max-w-lg mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 bg-emerald-500/80 rounded-2xl flex items-center justify-center 
                        shadow-xl">
          <i className="fas fa-check-circle text-3xl text-white"></i>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text 
                       text-transparent mb-4">
          Welcome Back!
        </h2>
        <p className="text-emerald-100 text-lg font-semibold">
          Secure Login Complete ✅
        </p>
      </div>

      {/* ✅ TWO BUTTONS - LOGIN THEME */}
      <div className="mt-12 space-y-6 max-w-md mx-auto">
        
        {/* LOGOUT - RED THEME */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-4 px-6 auth-btn bg-gradient-to-r from-red-600 to-rose-600 
                     hover:from-red-500 hover:to-rose-500 border border-red-500/50 
                     shadow-xl hover:shadow-red-500/30 text-white font-semibold rounded-xl 
                     transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
        >
          <i className="fas fa-power-off"></i>
          Logout
        </button>

        {/* NEW ACCOUNT - BLUE THEME */}
        <button
          onClick={() => navigate("/register")}
          className="w-full py-4 px-6 auth-btn bg-gradient-to-r from-blue-600 to-indigo-600 
                     hover:from-blue-500 hover:to-indigo-500 border border-blue-500/50 
                     shadow-xl hover:shadow-blue-500/30 text-white font-semibold rounded-xl 
                     transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
        >
          <i className="fas fa-user-plus"></i>
          New Account
        </button>

      </div>

    </AuthLayout>
  );
}
