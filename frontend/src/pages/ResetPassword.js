import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";

const BACKEND_URL = "https://password-reset-fug4.onrender.com";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ BrowserRouter: /reset-password?token=abc → useSearchParams WORKS
  const token = searchParams.get("token");

  // Check if token exists on load
  useEffect(() => {
    if (!token) {
      setMsg("Invalid reset link. Please request a new one.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/reset`, {
        token,
        password,
      });
      setMsg(res.data.message);
      
      // Success: Go to login after 3s
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      setMsg(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={
        <>
          <i className="fas fa-key-skeleton me-2" style={{ fontSize: '1.3rem' }}></i>
          Reset Password
        </>
      }
      subtitle="Enter your new password and confirm it below."
    >
      {/* BIG KEY ICON */}
      <div className="text-center mb-6">
        <i className="fas fa-key text-green-500" style={{ fontSize: '4rem', opacity: 0.8 }}></i>
      </div>

      {/* Token warning */}
      {!token && (
        <div className="alert alert-warning text-center mb-4 p-4 rounded-lg bg-yellow-500/20 border-yellow-500/50">
          <i className="fas fa-exclamation-triangle me-2 text-yellow-400"></i>
          No valid reset token found. <a href="/forgot-password" className="text-blue-400 hover:text-blue-300 font-medium">Request new link</a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-200">
            <i className="fas fa-lock me-2 text-blue-400"></i>New Password
          </label>
          <input
            type="password"
            placeholder="New Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input w-full"
            required
            minLength="6"
            disabled={loading || !token}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-200">
            <i className="fas fa-lock-open me-2 text-blue-400"></i>Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="auth-input w-full"
            required
            disabled={loading || !token}
          />
        </div>
        
        <button 
          type="submit" 
          className="auth-btn w-full py-3"
          disabled={loading || !token || password !== confirm || password.length < 6}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin me-2"></i>
              Updating...
            </>
          ) : (
            <>
              <i className="fas fa-magic me-2"></i>
              Update Password
            </>
          )}
        </button>
      </form>

      {msg && (
        <div className={`mt-6 p-4 rounded-lg border text-sm text-center ${
          msg.includes('success') || msg.includes('changed')
            ? 'bg-green-500/20 border-green-500/50 text-green-100'
            : 'bg-red-500/20 border-red-500/50 text-red-100'
        }`}>
          <i className={`fas fa-circle-check me-2 fs-4 ${
            msg.includes('success') || msg.includes('changed') 
              ? 'text-green-400' 
              : 'text-red-400'
          }`}></i>
          {msg}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <a 
          href="/login" 
          className="text-blue-400 hover:text-blue-300 font-medium text-sm"
        >
          <i className="fas fa-arrow-left me-1"></i>
          Back to Login
        </a>
      </div>
    </AuthLayout>
  );
}
