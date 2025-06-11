import express from "express";
import {} from "../controllers/exam.controller";
const router = express.Router();

router.post("/", createExam);

export default router;
