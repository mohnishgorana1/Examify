import express from "express";
import {
  createExam,
  createQuestion,
  myCreatedExams,
  myCreatedQuestions,
  fetchExamDetails,
  updateExam,
  newExams,
  myExams,
  getFullExamDetails,
  enrollToExam,
  startExam,
  submitExam,
  viewResult,
  getResults,
  viewSubmissionByExamId
} from "../controllers/exam.controller";
import { extractUser } from "../middleware/extractUser";
const router = express.Router();

router.get("/my-created-exams", extractUser, myCreatedExams);
router.get("/my-created-questions", extractUser, myCreatedQuestions);
router.get("/new-exams", extractUser, newExams);
router.get("/my-exams", extractUser, myExams);
router.get("/get-results", extractUser, getResults)


router.get("/full/:examId", extractUser, getFullExamDetails);
router.get("/:examId", extractUser, fetchExamDetails);
router.get("/result/:examId", extractUser, viewResult)
router.get("/get-submissions/:examId", extractUser, viewSubmissionByExamId)
router.post("/create-exam", extractUser, createExam);
router.post("/create-question", extractUser, createQuestion);
router.put("/:examId", extractUser, updateExam);

router.post("/enroll", extractUser, enrollToExam);
router.post("/start", extractUser, startExam);
router.post("/submit", extractUser, submitExam)

export default router;
