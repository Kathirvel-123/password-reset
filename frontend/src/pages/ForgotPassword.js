// frontend/src/pages/ForgotPassword.js - FIXED
import { useState } from "react";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";

const BACKEND_URL = "http://localhost:5000";  // ✅ LOCAL BACKEND

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/forgot`, { email });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Server error. Please try again.");
    }
  };

  return (
    <AuthLayout
      title={
        <>
          Forgot Password
        </>
      }
      subtitle="Enter your registered email address and we'll send you a reset link."
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="fas fa-envelope text-primary me-2"></i>
            Email
          </label>
          <div className="input-group">
            <span className="input-group-text bg-transparent border-end-0">
              <i className="fas fa-at text-muted"></i>
            </span>
            <input
              className="form-control form-control-lg ps-0 border-start-0"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        
        <button className="btn btn-primary w-100 btn-lg py-2 fw-semibold" type="submit">
          <i className="fas fa-paper-plane me-2"></i>
          Send Reset Link
        </button>
      </form>

      {msg && (
        <div className="alert mt-3 mb-0 text-center py-2 border-0">
          <div className="d-flex align-items-center justify-content-center">
            <i 
              className={`fas fa-circle-check me-2 ${
                msg.includes('sent') || msg.includes('success') 
                  ? 'text-success' 
                  : 'text-warning'
              }`}
              style={{ fontSize: '1.2rem' }}
            ></i>
            <span>{msg}</span>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
