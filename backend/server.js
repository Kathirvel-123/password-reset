const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./src/authRoutes");

const app = express();

// ✅ FIXED CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "https://password-reset007.netlify.app/"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check FIRST
app.get("/", (req, res) => {
  res.json({ message: "Backend running! Auth API ready." });
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// ✅ Auth routes BEFORE 404
app.use("/api/auth", authRoutes);

// ✅ FIXED 404 - Express 5 compatible
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for: localhost:3000`);
});
