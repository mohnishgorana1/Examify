import express from "express";
import { getProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { extractUser } from "../middleware/extractUser";

const router = express.Router();

router.get("/me", authMiddleware, getProfile);


export default router;
