import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./database/index.js";   // your DB connection
import { server_routes } from "./routes/index.js"; // your routes

const app = express();

// ✅ CORS middleware
app.use(cors({
  origin: "https://event-frontend-369k.onrender.com", // replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Parse JSON
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api", server_routes);

// ✅ Start Server
const PORT = process.env.SERVER_PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
