const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");

dotenv.config();

const membersRouter = require("./routes/members");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Heritage Revival Backend API" });
});

// Use members router directly (no file upload middleware)
app.use("/api/members", membersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
