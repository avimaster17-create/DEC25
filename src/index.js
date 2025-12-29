require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const pool = require("./db");

const science = require("./science.json");
const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/notesRoutes");

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

// routes
app.use("/users", userRouter);
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Hello User");
});

app.get("/science", (req, res) => {
  res.status(200).json(science);
});

app.get("/random", (req, res) => {
  const scientists = science.scientists;
  const index = Math.floor(Math.random() * scientists.length);
  res.status(200).json(scientists[index]);
});

// ---------- DATABASE CONNECTIONS ----------

// MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://avinashpandey1711_db_user:WucBbkbGk8yAW84R@cluster0.zb83t2q.mongodb.net/?appName=Cluster0";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// PostgreSQL
(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL connected:", result.rows[0]);
  } catch (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
  }
})();

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
