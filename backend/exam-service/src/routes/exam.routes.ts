import express from "express";
import { createExam, createQuestion, myCreatedExams, myCreatedQuestions, fetchExamDetails, updateExam, upcomingExams, enrollToExam, myExams } from "../controllers/exam.controller";
import { extractUser } from "../middleware/extractUser";
const router = express.Router();

router.get("/my-created-exams", extractUser, myCreatedExams);
router.get("/my-created-questions", extractUser, myCreatedQuestions)
router.get("/upcoming-exams", extractUser, upcomingExams)
router.get("/my-exams", extractUser, myExams)


router.get("/:examId", extractUser, fetchExamDetails)

router.post("/create-exam", extractUser, createExam);
router.post("/create-question", extractUser, createQuestion);
router.put("/:examId", extractUser, updateExam);


router.post("/enroll", extractUser, enrollToExam);





export default router;
