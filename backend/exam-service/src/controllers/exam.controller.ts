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
  const {
    title,
    description,
    duration,
    questions,
    totalMarks,
    passingMarks,
    marksPerQuestion,
  } = req.body;

  if (!examId) {
    return res.status(400).json({
      success: false,
      message: "Invalid examId",
    });
  }

  if (
    !title ||
    !description ||
    !duration ||
    !marksPerQuestion ||
    !Array.isArray(questions)
  ) {
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
    exam.marksPerQuestion = marksPerQuestion;

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

export const getResults = async (req: any, res: any) => {
  console.log("Inside all results ");
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
        message: "Only instructors can get their exam results",
      });
    }

    // now find exams of the instructore
    const instructorId = req.user?._id;

    console.log("instructor", instructorId);

    const exams = await Exam.find({ createdBy: instructorId })
      .populate("questions")
      .exec();
    // console.log("Exams", exams, exams.length);

    if (exams.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "You have not created any exams" });
    }

    // get all examIds
    // and find submission from all examIds

    let examIds: any = [];
    exams.map((exam, idx) => {
      examIds.push(exam._id);
    });
    console.log("Exams", exams);

    console.log("exam ids", examIds);

    const submissions = await Submission.find({
      examId: { $in: examIds },
    }).populate("examId");

    console.log("submissions", submissions);

    // iske pass vo sare exams hai jo iss instructor ke h
    // fir  iske pass vo sare submsions h jo iski banai exams ke hai

    const examResults = exams.map((exam: any) => {
      // Har exam ke liye uske submissions filter krte hai
      const examSubmissions = submissions.filter(
        (sub) => sub.examId._id.toString() === exam._id.toString()
      );

      return {
        examId: exam._id,
        title: exam.title,
        description: exam.description,
        scheduledAt: exam.scheduledAt,
        totalMarks: exam.totalMarks,
        passingMarks: exam.passingMarks,
        submissions: examSubmissions.map((sub) => ({
          submissionId: sub._id,
          studentId: sub.studentId,
          score: sub.score,
          status: sub.status,
          submittedAt: sub.submittedAt,
          attemptNumber: sub.attemptNumber,
          timeTaken: sub.timeTaken,
        })),
      };
    });

    console.log("exam results", examResults);

    return res.status(201).json({
      success: true,
      message: "Results fetched successfully",
      // results: submissions,
      // exams: exams,

      examResults,
    });
  } catch (error) {
    console.error("Error in fetching results:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const viewSubmissionByExamId = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  const { examId } = req.params;
  console.log("Inside view submisiosns for exam", examId);

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
        message: "Only instructors can get their exam results",
      });
    }

    const instructorId = req.user?._id;

    const submissions = await Submission.find({
      examId,
    })
      .populate("examId")
      .exec();

    // console.log("submissions", submissions);

    // now we need all submissions students
    const studentIds = submissions.map((sub) => sub.studentId);

    // find all users details
    const usersResponse = await axios.post(
      `${process.env.USER_SERVICE_URL}/api/v1/user/fetch-users`,
      { studentIds: studentIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const users = usersResponse?.data?.users;
    if (!usersResponse.data.success) {
      throw new Error("Failed to fetch student details");
    }

    // now sare students ki details aa gyi
    // now ab jis jis submission me jo jo studentId hogi us us submission me us studentId ke user details daal dete h

    const studentsMap: any = {};
    users &&
      users.forEach((user: any) => {
        studentsMap[user._id] = user;
      });

    const enrichedSubmissions = submissions.map((sub) => ({
      ...sub.toObject(),
      studentInfo: studentsMap[sub.studentId] || null,
    }));

    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions: enrichedSubmissions,
      exam: submissions[0].examId,
    });
  } catch (error) {
    console.error("Error in fetching submissions:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// FOR STUDENTS
export const newExams = async (req: any, res: any) => {
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
        message: "Only students can access new exams",
      });
    }

    const studentId = data.user._id;

    // 🔥 Fetch already enrolled exams
    const enrolledExamDocs = await Enrollment.find({ studentId }).select(
      "examId"
    );
    const enrolledExamIds = enrolledExamDocs.map((e) => e.examId.toString());

    console.log("enrolledexamIds", enrolledExamIds);

    // 📦 Exams NOT enrolled
    const newExams = await Exam.find({
      _id: {
        $nin: enrolledExamIds.map((id) => new mongoose.Types.ObjectId(id)),
      },
    }).sort({ scheduledAt: 1 });

    console.log("upcoiming exam", newExams);

    return res.status(200).json({
      success: true,
      exams: newExams,
    });
  } catch (error) {
    console.error("Error fetching upcoming exams:", error);
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

export const getFullExamDetails = async (req: any, res: any) => {
  console.log("insidew fulld examdetails");

  const token = req.headers.authorization?.split(" ")[1];

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user not found in request",
    });
  }

  const { examId } = req.params;
  const studentId = req.user._id;

  try {
    const exam = await Exam.findById(examId).populate("questions").exec();

    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }

    // ✅ Check if the student submitted the exam
    const submission = await Submission.findOne({ examId, studentId });

    const isAttempted = !!submission;

    return res.status(200).json({
      success: true,
      message: "Exam details fetched",
      exam,
      isAttempted,
      score: submission?.score || null,
      submittedAt: submission?.submittedAt || null,
      userAnswers: submission?.answers || [],
    });
  } catch (error) {
    console.log("Error", error);

    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
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

export const startExam = async (req: any, res: any) => {
  console.log("inside star exam");

  const token = req.headers.authorization?.split(" ")[1];

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user not found in request",
    });
  }

  const { examId } = req.body;
  if (!examId) {
    return res.status(401).json({
      success: false,
      message: "Exam id not in request",
    });
  }

  try {
    const exam = await Exam.findById(examId).populate("questions").exec();
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }

    // Check if already submitted
    const alreadySubmitted = await Submission.findOne({
      examId,
      studentId: req.user._id,
      status: { $in: ["submitted", "auto-submitted"] },
    });

    if (alreadySubmitted) {
      return res.status(403).json({
        success: false,
        message: "You have already submitted this exam.",
      });
    }

    // Count previous submissions for attempt number
    const previousAttempts = await Submission.countDocuments({
      examId,
      studentId: req.user._id,
    });

    // create new submissions
    const submission = await Submission.findOneAndUpdate(
      {
        examId,
        studentId: req.user._id,
        status: "started",
      },
      {
        $setOnInsert: {
          examId,
          studentId: req.user._id,
          status: "started",
          attemptNumber: previousAttempts + 1,
          startedAt: new Date(),
          score: 0,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Exam started",
      submission,
      exam,
    });
  } catch (error) {
    console.error("Start Exam Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const submitExam = async (req: any, res: any) => {
  console.log("insidew submit exam");

  const token = req.headers.authorization?.split(" ")[1];

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user not found in request",
    });
  }

  const { examId, answers, timeTaken, isAutoSubmitted, submissionId } =
    req.body;
  const studentId = req.user._id;

  console.log(
    "req body",
    examId,
    submissionId,
    timeTaken,
    isAutoSubmitted,
    answers
  );

  try {
    const exam = await Exam.findById(examId).populate("questions").exec();
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }

    // console.log("exam", exam);

    // actual logic starts here
    // see we have exam in it has Questions[] also we have answers having questionId and selectedOpption
    // to ab me sare questions ka ek map banau or fir sare answers se match kra ke check krlu shi h ya nhi
    // agar shi hoga to score ko badadunga jo bhi per question mark hoga

    // build questionMap
    const questionMap = new Map();
    for (const q of exam.questions as any[]) {
      questionMap.set(q._id.toString(), q.correctAnswer);
    }

    console.log("question Map", questionMap);

    let score = 0;

    for (const a of answers) {
      const correct = questionMap.get(a.questionId);
      if (correct === a.selectedOption) {
        score = score + exam.marksPerQuestion!;
      }
    }

    console.log("scre ", score);

    const submission = await Submission.findOneAndUpdate(
      { _id: submissionId },
      {
        answers,
        score,
        status: isAutoSubmitted ? "auto-submitted" : "submitted",
        submittedAt: new Date(),
        isAutoSubmitted,
        timeTaken,
      }
    );

    if (!submission) {
      return res.status(500).json({ success: false, message: "Error " });
    }

    return res.status(200).json({
      success: true,
      message: "Exam submitted successfully",
      score,
      submissionId: submission._id,
      submittedAt: submission.submittedAt,
    });
  } catch (error) {
    console.log("Error", error);

    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

export const viewResult = async (req: any, res: any) => {
  console.log("insidew view exam");

  const token = req.headers.authorization?.split(" ")[1];

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: user not found in request",
    });
  }

  const { examId } = req.params;
  const studentId = req.user._id;

  try {
    const exam = await Exam.findById(examId).populate("questions").exec();
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }

    const submission = await Submission.findOne({
      examId: examId,
      studentId: studentId,
    });
    if (!submission) {
      return res.status(500).json({
        success: false,
        message: "No Submission Found for this exam and student",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Result found successfully",
      exam,
      submission,
    });
  } catch (error) {
    console.log("Error", error);

    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};
