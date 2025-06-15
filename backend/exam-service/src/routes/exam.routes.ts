import express from "express";
import { createExam, createQuestion, addQuestionsToExam } from "../controllers/exam.controller";
import { extractUser } from "../middleware/extractUser";
const router = express.Router();

// router.post("/", createExam);
router.post("/create-exam", extractUser, createExam);
router.post("/create-question", extractUser, createQuestion);
router.post("/:examId/add-questions", extractUser, addQuestionsToExam);



export default router;
