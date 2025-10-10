// GET: /api/exam/instructor/exams (list all created exams)

import connectDB from "@/lib/config/db";
import { Exam } from "@/models/exam.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const instructorId = url.searchParams.get("instructorId");

    if (!instructorId) {
      return NextResponse.json(
        { success: false, message: "Missing instructorId" },
        { status: 400 }
      );
    }

    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      return NextResponse.json(
        { success: false, message: "Instructor not found or unauthorized" },
        { status: 403 }
      );
    }

    // find all exams here
    const exams = await Exam.find({ createdBy: instructorId })
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    if (!exams || exams.length === 0) {
      return NextResponse.json(
        { success: false, message: "No Exam Found" },
        { status: 401 }
      );
    }

    console.log("exams", exams);

    return NextResponse.json({ success: true, data: exams }, { status: 200 });
  } catch (error) {
    console.error("Fetch Questions Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching questions" },
      { status: 500 }
    );
  }
}
