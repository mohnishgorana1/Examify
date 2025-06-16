import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authenticateUser } from "../middleware/auth.middleware";
import expressProxy from "express-http-proxy";

dotenv.config();

const router = express.Router();

// 🟢 AUTH SERVICE
router.use(
  "/api/v1/auth",
  expressProxy(process.env.AUTH_SERVICE_URL!, {
    proxyReqPathResolver: (req) => `/api/v1/auth${req.url}`,
  })
);

// 🔵 USER SERVICE
router.use(
  "/api/v1/user",
  expressProxy(process.env.USER_SERVICE_URL!, {
    proxyReqPathResolver: (req) => `/api/v1/user${req.url}`,
  })
);

// 🔴 EXAM SERVICE
router.use(
  "/api/v1/exam",
  authenticateUser,
  expressProxy(process.env.EXAM_SERVICE_URL!, {
    proxyReqPathResolver: (req) => `/api/v1/exam${req.url}`,

    proxyReqOptDecorator: (proxyReqOpts: any, req: any) => {
      proxyReqOpts.headers["x-user"] = JSON.stringify(req.user);
      return proxyReqOpts;
    },
  })
);

export default router;
