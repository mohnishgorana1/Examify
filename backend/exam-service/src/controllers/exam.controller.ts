import axios from "axios";
import { Exam } from "../models/exam.model";
import { Question } from "../models/question.model";
import mongoose from "mongoose";
import { Submission } from "../models/submission.model";
import { Enrollment } from "../models/enrollment";

export const createExam = async (req: any, res: any) => {
  console.log("Inside create exam");
  const token = req.headers.authorization?.split(" ")[1];
  console.log("TOKEN IN CONTORLLER ", token);

  if (!req.user) {
    console.error("Can't get req.user:");
    return res
      .status(500)
      .json({ success: false, message: "Can't get req.user" });
  }
  if (!token) {
    console.error("Can't get Token");
    return res
      .status(500)
      .json({ success: false, message: "Can't get Authorization Token" });
  }
  // console.log("GOT IT HURRAY req.user", req.user);
  try {
    const { data } = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/v1/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.user?.role !== "instructor") {
      return res
        .status(403)
        .json({ success: false, message: "Only instructors can create exams" });
    }

    console.log("DATA from user service response", data);

    const {
      title,
      description,
      duration,
      scheduledAt,
      questions = [],
      totalMarks,
      passingMarks,
    } = req.body;

    if (!title || !description || !duration || !scheduledAt) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const newExam = new Exam({
      createdBy: data?.user?._id,
      title,
      description,
      duration,
      scheduledAt,
      questions,
      totalMarks,
      passingMarks,
    });

    await newExam.save();
    console.log("Exam created success", newExam);
    return res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam: newExam,
    });
  } catch (error) {
    console.error("Error in creating exam:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};
export const fetchExamDetails = async (req: any, res: any) => {
  console.log("Inside fetch signle exam details");
  const token = req.headers.authorization?.split(" ")[1];

  if (!req.user) {
    console.error("Can't get req.user:");
    return res
      .status(500)
      .json({ success: false, message: "Can't get req.user" });
  }
  if (!token) {
    console.error("Can't get Token");
    return res
      .status(401)
      .json({ success: false, message: "Can't get Authorization Token" });
  }

  const { examId } = req.params;
  if (!examId) {
    console.error("Can't get examID in params");
    return res
      .status(400)
      .json({ success: false, message: "Can't get examID in params" });
  }
  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res
        .status(500)
        .json({ success: false, message: "Can't get any exam" });
    }

    console.log("Exam fetched success", exam);
    return res.status(201).json({
      success: true,
      message: "Exam fetched successfully",
      exam: exam,
    });
  } catch (error) {
    console.error("Error in fetching exam:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const createQuestion = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!req.user) {
    console.error("Can't get req.user:");
    return res
      .status(500)
      .json({ success: false, message: "Can't get req.user" });
  }
  if (!token) {
    console.error("Can't get Token");
    return res
      .status(500)
      .json({ success: false, message: "Can't get Authorization Token" });
  }

  try {
    const { data } = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/v1/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.user?.role !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can create questions",
      });
    }

    // ✅ Create the question
    const { text, type, options, correctAnswer, explanation } = req.body;

    if (!text || !type || !options || correctAnswer == null) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const question = await Question.create({
      createdBy: data.user._id,
      text,
      type,
      options,
      correctAnswer,
      explanation,
    });

    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      question: question,
    });
  } catch (error) {
    console.error("Error in creating question:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const updateExam = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!req.user) {
    console.error("Unable to extract user from request. Auth failed?");
    return res.status(500).json({
      success: false,
      message: "Unable to extract user from request. Auth failed?",
    });
  }
  if (!token) {
    console.error("Can't get Token");
    return res
      .status(500)
      .json({ success: false, message: "Can't get Authorization Token" });
  }

  const { examId } = req.params;
  const { title, description, duration, questions, totalMarks, passingMarks } =
    req.body;

  if (!examId) {
    return res.status(400).json({
      success: false,
      message: "Invalid examId",
    });
  }

  if (!title || !description || !duration || !Array.isArray(questions)) {
    return res.status(400).json({
      success: false,
      message: "Missing or invalid fields",
    });
  }

  if (
    typeof totalMarks !== "number" ||
    typeof passingMarks !== "number" ||
    totalMarks <= 0 ||
    passingMarks < 0 ||
    passingMarks > totalMarks
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid totalMarks or passingMarks",
    });
  }

  try {
    const { data } = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/v1/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.user?.role !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can add questions to exam",
      });
    }

    // 1. ✅ Check if exam exists and belongs to this instructor
    const exam = await Exam.findOne({ _id: examId, createdBy: data.user._id });
    if (!exam) {
      return res
        .status(403)
        .json({ message: "You don't have permission to modify this exam" });
    }

    // 2. ✅ Check if all questions exist and belong to this instructor
    const validQuestions = await Question.find({
      _id: {
        $in: questions.map((id: string) => new mongoose.Types.ObjectId(id)),
      },
      createdBy: data.user._id,
    });

    if (validQuestions.length !== questions.length) {
      return res.status(400).json({
        message: "Some questionIds are invalid or not created by you",
      });
    }

    // ✅ Update exam fields
    exam.title = title;
    exam.description = description;
    exam.duration = duration;
    exam.questions = questions;
    exam.totalMarks = totalMarks;
    exam.passingMarks = passingMarks;

    await exam.save();

    return res.status(201).json({
      success: true,
      message: "Exam Updated successfully",
      exam,
    });
  } catch (error) {
    console.error("Error in updating exam: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const myCreatedExams = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!req.user) {
    console.error("Unable to extract user from request. Auth failed?");
    return res.status(500).json({
      success: false,
      message: "Unable to extract user from request. Auth failed?",
    });
  }
  if (!token) {
    console.error("Can't get Token in myCreatedExams controller");
    return res
      .status(500)
      .json({ success: false, message: "Can't get Authorization Token" });
  }

  try {
    const exams = await Exam.find({ createdBy: req?.user?._id });
    if (!exams) {
      return res.status(403).json({ message: "No Exams Found" });
    }
    return res.status(201).json({
      success: true,
      message: "Creted Exams fetched successfully",
      exams,
    });
  } catch (error) {
    console.error("Error in fetching your created exams", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};
export const myCreatedQuestions = async (req: any, res: any) => {
  console.log("inside mycreated ques");

  const token = req.headers.authorization?.split(" ")[1];
  if (!req.user) {
    console.error("Unable to extract user from request. Auth failed?");
    return res.status(500).json({
      success: false,
      message: "Unable to extract user from request. Auth failed?",
    });
  }

  if (!token) {
    console.error("Can't get Token in myCreatedExams controller");
    return res
      .status(500)
      .json({ success: false, message: "Can't get Authorization Token" });
  }

  try {
    const { data } = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/v1/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.user?.role !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can have their cretaed questions",
      });
    }

    const questions = await Question.find({ createdBy: req?.user?._id });
    if (!questions) {
      return res.status(403).json({ message: "No questions Found" });
    }
    console.log("QUESTIONS", questions);

    return res.status(201).json({
      success: true,
      message: "Created questions fetched successfully",
      questions,
    });
  } catch (error) {
    console.error("Error in fetching your created questions", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// FOR STUDENTS
export const upcomingExams = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user not found in request",
    });
  }

  try {
    // 🔐 Get user details
    const { data } = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/v1/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data?.user?.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access upcoming exams",
      });
    }

    const studentId = data.user._id;

    // Exclude exams already attempted by the student
    const attemptedSubmissions = await Submission.find({ studentId }).select(
      "examId"
    );
    const attemptedExamIds = attemptedSubmissions.map((s) =>
      s.examId.toString()
    );
    console.log("attemptedExamIds", attemptedExamIds);

    // 🔥 Fetch already enrolled exams
    const enrolledExamDocs = await Enrollment.find({ studentId }).select(
      "examId"
    );
    const enrolledExamIds = enrolledExamDocs.map((e) => e.examId.toString());

    console.log("enrolledexamIds", enrolledExamIds);

    // 🕒 Fetch exams scheduled in the future
    const now = new Date();

    const allExams = await Exam.find().select("_id");
    console.log("All exams", allExams);

    // fetch exams scheduled in future and not attempted
    const upcomingExams = await Exam.find({
      scheduledAt: { $gte: now },
      _id: {
        $nin: [...attemptedExamIds, ...enrolledExamIds].map(
          (id) => new mongoose.Types.ObjectId(id)
        ),
      },
    }).sort({ scheduledAt: 1 });

    console.log("upcoiming exam", upcomingExams);

    return res.status(200).json({
      success: true,
      exams: upcomingExams,
    });
  } catch (error) {
    console.error("Error fetching upcoming exams:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const enrollToExam = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user not found in request",
    });
  }

  const { examId } = req.body;

  if (!examId) {
    return res.status(400).json({
      success: false,
      message: "examId is required",
    });
  }

  try {
    const { data } = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/v1/user/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data?.user?.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can enroll in exams",
      });
    }

    const studentId = data.user._id;

    // ❌ Prevent duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({ studentId, examId });
    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this exam",
      });
    }

    // ✅ Create enrollment
    const enrollment = await Enrollment.create({ studentId, examId });
    return res.status(201).json({
      success: true,
      message: "Successfully enrolled in the exam",
      enrollment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const myExams = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user not found in request",
    });
  }

  try {
    // 🔐 Get user details
    const { data } = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/v1/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data?.user?.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access their exams",
      });
    }

    const studentId = data.user._id;
    const now = new Date();

    // 🧾 Submissions (attempted)
    const submissions = await Submission.find({ studentId }).select("examId");
    const attemptedExamIds = submissions.map((s) => s.examId.toString());

    // 📋 Enrollments
    const enrollments = await Enrollment.find({ studentId }).select("examId");
    const enrolledExamIds = enrollments.map((e) => e.examId.toString());

    // 🟢 1. Attempted Exams
    const attemptedExams = await Exam.find({
      _id: { $in: attemptedExamIds },
    }).sort({ scheduledAt: -1 });

    // 🟡 2. Enrolled But Not Attempted
    const enrolledNotAttemptedIds = enrolledExamIds.filter(
      (id) => !attemptedExamIds.includes(id)
    );

    const enrolledExams = await Exam.find({
      _id: { $in: enrolledNotAttemptedIds },
    });

    // Split enrolled exams into:
    const enrolledOnlyExams = enrolledExams.filter(
      (exam) => new Date(exam.scheduledAt) >= now
    );
    const expiredExams = enrolledExams.filter(
      (exam) => new Date(exam.scheduledAt) < now
    );

    return res.status(200).json({
      success: true,
      attemptedExams,
      enrolledOnlyExams,
      expiredExams,
    });
  } catch (error) {
    console.error("Error fetching my exams:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
