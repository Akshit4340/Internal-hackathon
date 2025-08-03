import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import CookieParser from "cookieparser";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
