// POST: /api/instructor-request/create
import { NextResponse } from "next/server";
import { InstructorRequest } from "@/models/instructor-request.model";
import connectDB from "@/lib/config/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { studentId, name, email, experience, qualifications } = body;

    console.log("req data", body);

    // --- Basic Validation ---
    if (!studentId || !name || !email) {
      console.log("Missing required fields.");

      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!Array.isArray(experience) || experience.length === 0) {
      console.log("Experience list cannot be empty.");

      return NextResponse.json(
        { success: false, message: "Experience list cannot be empty." },
        { status: 400 }
      );
    }

    if (!Array.isArray(qualifications) || qualifications.length === 0) {
      console.log("Qualifications list cannot be empty.");

      return NextResponse.json(
        { success: false, message: "Qualifications list cannot be empty." },
        { status: 400 }
      );
    }

    // --- Check if already applied ---
    const existingRequest = await InstructorRequest.findOne({
      studentId,
      status: { $in: ["pending", "approved"] },
    });

    // TODO : uncomment this
    // if (existingRequest) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message:
    //         "You already have an existing instructor request (pending or approved).",
    //     },
    //     { status: 400 }
    //   );
    // }

    // --- Create new request ---
    const newRequest = await InstructorRequest.create({
      student: studentId,
      name,
      email,
      experience,
      qualifications,
      status: "pending",
      requestedAt: new Date(),
    });

    console.log("Instructor application submitted successfully.");

    return NextResponse.json(
      {
        success: true,
        message: "Instructor application submitted successfully.",
        data: newRequest,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error submitting instructor request:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong while submitting.",
      },
      { status: 500 }
    );
  }
}
