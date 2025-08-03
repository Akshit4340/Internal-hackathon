import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import CookieParser from "cookieparser";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

const server = http.createServer(app); // 👈 create raw HTTP server

const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for your frontend origin in production
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

app.set("io", io); // So we can access io inside controllers

// app.use(CookieParser());

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
