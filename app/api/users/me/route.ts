import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/config/db";
import { User } from "@/models/user.model";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.log("not signed in");

      return NextResponse.json(
        { success: false, message: "Not signed in" },
        { status: 401 }
      );
    }

    await connectDB();

    
    const user = await User.findOne({ clerkUserId: userId }).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found in DB" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
