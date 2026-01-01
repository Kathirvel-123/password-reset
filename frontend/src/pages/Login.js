import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ ADDED FOR REDIRECT
import AuthLayout from "../components/AuthLayout";

const BACKEND_URL = "http://localhost:5000";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // ✅ NAVIGATION HOOK

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);
      setMsg(res.data.message);
      
      // ✅ SUCCESS → SHOW 2s → CONFETTI DASHBOARD! 🎉
      setTimeout(() => {
        navigate("/dashboard");  // 🎉 MAGIC! → Confetti explosion
      }, 2000);
      
    } catch (error) {
      setMsg(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title={
        <>
          <i className="fas fa-shield-alt me-2" style={{ fontSize: '1.3rem' }}></i>
          Login
        </>
      }
      subtitle="Enter your credentials to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="auth-input  w-full"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="auth-input w-full"
            required
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="auth-btn w-full py-3"
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin me-2"></i>
              Signing In...
            </>
          ) : (
            <>
              <i className="fa-solid fa-user me-2"></i>
              Login
            </>
          )}
        </button>
      </form>

      {msg && (
        <div className={`mt-6 p-4 rounded-lg ${
          msg.includes('successful') 
            ? 'bg-green-500/20 border-green-500/50 text-green-100' 
            : 'bg-red-500/20 border-red-500/50 text-red-100'
        } border text-sm`}>
          <i className={`fas ${
            msg.includes('successful') ? 'fa-check-circle text-green-400 me-2' : 'fa-exclamation-circle text-red-400 me-2'
          }`}></i>
          {msg}
        </div>
      )}

      <div className="mt-6 text-center space-y-2">
        <a 
          href="/forgot-password" 
          className="block text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          <i className="fas fa-key me-1"></i>
          Forgot Password?
        </a>
        
        <p className="text-gray-400 text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Register here
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
