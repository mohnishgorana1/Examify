import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import examRoutes from "./routes/exam.routes";
import connectDB from "./config/db";


dotenv.config();
connectDB();


const app = express();


// middleware
// middleware
app.use(
  cors({
    origin: process.env.EXAMIFY_FRONTEND_URL, // ya jo bhi frontend origin ho
    credentials: true, // ✅ This is most important
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser());


// Routes
app.use("/api/v1/exam", examRoutes);

export default app;