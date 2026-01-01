import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const BACKEND_URL = "https://password-reset-fug4.onrender.com";  

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, formData);
      setMsg(res.data.message);
      // ✅ 5 SECONDS - Shows success message
      setTimeout(() => navigate("/login"), 5000);
    } catch (error) {
      setMsg(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Create Account
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="auth-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="auth-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="auth-input"
          required
        />
        <button type="submit" className="auth-btn w-full">
          Register
        </button>
      </form>

      {msg && (
        <div className={`alert mt-6 ${msg.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
          {msg}
        </div>
      )}

      <p className="mt-6 text-center text-gray-400">
        Already have account?{' '}
        <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
          Login here
        </a>
      </p>
    </AuthLayout>
  );
}
