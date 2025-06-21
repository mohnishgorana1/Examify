import express from "express";
import { createExam, createQuestion, myCreatedExams, myCreatedQuestions, fetchExamDetails, updateExam } from "../controllers/exam.controller";
import { extractUser } from "../middleware/extractUser";
const router = express.Router();

// router.post("/", createExam);
router.post("/create-exam", extractUser, createExam);
router.get("/my-created-exams", extractUser, myCreatedExams);
router.post("/create-question", extractUser, createQuestion);
router.get("/my-created-questions", extractUser, myCreatedQuestions)
router.get("/:examId", extractUser, fetchExamDetails)
router.put("/:examId", extractUser, updateExam);



export default router;
