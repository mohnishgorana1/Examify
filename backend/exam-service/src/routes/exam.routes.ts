import express from "express";
import { createExam, createQuestion, addQuestionsToExam, myCreatedExams, myCreatedQuestions, fetchExamDetails } from "../controllers/exam.controller";
import { extractUser } from "../middleware/extractUser";
const router = express.Router();

// router.post("/", createExam);
router.post("/create-exam", extractUser, createExam);
router.get("/my-created-exams", extractUser, myCreatedExams);
router.post("/create-question", extractUser, createQuestion);
router.get("/my-created-questions", extractUser, myCreatedQuestions)
router.get("/:examId", extractUser, fetchExamDetails)
router.post("/:examId/add-questions", extractUser, addQuestionsToExam);



export default router;
