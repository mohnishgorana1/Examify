import express from "express";
import { getProfile, fetchUsers, createProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { extractUser } from "../middleware/extractUser";

const router = express.Router();
router.post("/create-profile", createProfile)
router.get("/me", authMiddleware, getProfile);
router.post("/fetch-users", authMiddleware, fetchUsers)


export default router;
