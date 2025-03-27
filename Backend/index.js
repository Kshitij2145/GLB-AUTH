import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Import routes
import AuthRouter from "./Route/AuthRouter.js";

// Import database connection
import "./Model/db.js"; // Ensure MongoDB connects properly

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Routes
app.use("/auth", AuthRouter);

// Start server
app.listen(PORT, () => {
    console.log(` Server is running at port ${PORT}`);
});
