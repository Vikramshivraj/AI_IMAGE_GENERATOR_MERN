import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/posts", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// DB connection
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.error("DB Error:", err);
  }
};

const startServer = async () => {
  await connectDB();
  app.listen(8080, () => console.log("Server running on 8080"));
};

startServer();