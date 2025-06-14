import express from "express";
import {
  register,
  login,
  refreshAccessToken,
  verifyToken,
  logout,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-token", verifyToken);

router.post("/refresh-access-token", refreshAccessToken);
router.post("/logout", authMiddleware, logout);

export default router;
