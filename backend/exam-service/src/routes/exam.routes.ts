import express from "express";
import { createExam } from "../controllers/exam.controller";
import { extractUser } from "../middleware/extractUser";
const router = express.Router();

// router.post("/", createExam);
router.get("/create-exam", extractUser, createExam);

export default router;
