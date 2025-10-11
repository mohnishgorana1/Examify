//  POST /api/exam/student/exams/[examId]/submit

import connectDB from "@/lib/config/db";
import { Exam } from "@/models/exam.model";
import { Question } from "@/models/question.model";
import { Submission } from "@/models/submission.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { examId: string } }
) {
  try {
    await connectDB();

    const { examId } = await params;

    const { studentId, answers, timeTaken, isAutoSubmitted, submissionId } =
      await req.json();


      console.log("studentId", studentId, "answers", answers, "timeTaken", timeTaken, "isAutoSubmitted", isAutoSubmitted, "submissionId", submissionId)


    if (!studentId) {
      return NextResponse.json(
        { success: false, message: "Missing studentId" },
        { status: 400 }
      );
    }
    if (!examId) {
      console.log("exam id", examId);

      return NextResponse.json(
        { success: false, message: "Missing examId" },
        { status: 400 }
      );
    }

    // Check if student exists and has proper role
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return NextResponse.json(
        { success: false, message: "student not found or unauthorized" },
        { status: 403 }
      );
    }

    const exam = await Exam.findById(examId)
      .populate({
        path: "questions",
        model: Question,
      })
      .exec();
    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    // actual logic starts here
    // see we have exam in it has Questions[] also we have answers having questionId and selectedOption
    // to ab me sare questions ka ek map banau or fir sare answers se match kra ke check krlu shi h ya nhi
    // agar shi hoga to score ko badadunga jo bhi per question mark hoga

    // build questionMap
    const questionMap = new Map();
    for (const q of exam.questions) {
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
      return NextResponse.json(
        { success: false, message: "Error in Submission" },
        { status: 500 }
      );
    }

    console.log("submission", submission);
    

    return NextResponse.json(
      {
        success: true,
        message: "Exam submitted successfully",
        data: {
          score,
          submissionId: submission._id,
          submittedAt: submission.submittedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Submitting Exam:", error);
    return NextResponse.json(
      { success: false, message: "Error Submitting Exam" },
      { status: 500 }
    );
  }
}
