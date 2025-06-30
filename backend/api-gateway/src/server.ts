import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import proxyRoutes from "./routes/proxy.routes";
import cors from "cors";
dotenv.config();
const app = express();

app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});

app.use(limiter);
// middleware
app.use(
  cors({
    origin: process.env.EXAMIFY_FRONTEND_URL,
    credentials: true, // ✅ This is most important
  })
);


// Mount proxy routes
app.use("/", proxyRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
