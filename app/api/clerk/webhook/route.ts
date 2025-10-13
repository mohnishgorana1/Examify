// route: GET -> /api/clerk/webhook
import { Webhook } from "svix";
import { NextResponse } from "next/server";
import {
  createAccountInDatabase,
  deleteAccountInDatabase,
} from "@/actions/user.actions";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing Clerk Webhook Secret");
  }

  try {
    const payload = await req.text();
    const heads = new Headers(req.headers);

    const svix_id = heads.get("svix-id");
    const svix_timestamp = heads.get("svix-timestamp");
    const svix_signature = heads.get("svix-signature");

    // Validate Clerk webhook headers
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse("Missing svix headers", { status: 400 });
    }

    // Verify the webhook signature
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    // The event type must be explicitly defined here to ensure correct typing
    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    const { type, data } = evt as {
      type: string;
      data: Record<string, any>;
    };

    // 1. Handle user.created event (Create in DB, Delete from Clerk if DB fails)
    if (type === "user.created") {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        phone_numbers,
        birthday,
      } = data;

      const fullName = `${first_name || ""} ${last_name || ""}`.trim();
      const email = email_addresses?.[0]?.email_address || "";
      const phone = phone_numbers?.[0]?.phone_number;
      const dob = birthday ? new Date(birthday) : new Date();

      // 🔧 Try creating the user in MongoDB
      const result = await createAccountInDatabase(
        id,
        fullName,
        email,
        phone,
        dob
      );

      if (!result.success) {
        // console.error(
        //   "❌ Failed to create user in DB. Initiating Clerk cleanup..."
        // );
        // Delete Clerk user if DB creation fails
        if (result.status !== 409) {
          // 409 only in existing user in db
          // means not existing users but still fails to create new user hence : DELETE user from clerk too

          try {
            await clerkClient.users.deleteUser(id);
            // console.log("Successfully deleted Clerk user during cleanup:", id);
          } catch (cleanupError) {
            console.error(
              "⚠️ Failed to delete Clerk user during cleanup:",
              cleanupError
            );
          }
        }
        return NextResponse.json(
          {
            success: false,
            message: "User creation failed in MongoDB (Clerk user cleaned up)",
            data: result,
          },
          { status: result.status }
        );
      }

      // User successfully created
      // console.log("User stored in DB successfully:", email);
      return NextResponse.json(
        {
          success: true,
          message: "User created successfully in both Clerk and MongoDB",
          data: result.data,
        },
        { status: 201 }
      );
    }

    // 2. Handle user.deleted event (Delete from DB)
    if (type === "user.deleted") {
      const { id } = data; // Clerk user ID
      // console.log("user is trying to delte clerk user id", id);

      if (!id) {
        return new NextResponse("Missing user ID in payload", { status: 400 });
      }

      const result = await deleteAccountInDatabase(id);

      if (!result.success && result.status !== 404) {
        console.error("❌ Failed to delete user from DB:", result.message);
        return NextResponse.json(
          {
            success: false,
            message: "User deletion failed in MongoDB",
          },
          { status: result.status }
        );
      }

      // console.log("DB record deleted successfully for Clerk user:", id);
      return NextResponse.json(
        {
          success: true,
          message: "User deleted successfully from MongoDB",
        },
        { status: 200 }
      );
    }

    // 🚫 Ignore unsupported events
    return NextResponse.json(
      { success: true, message: `Event type '${type}' ignored.` },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Webhook Error:", err);
    return new NextResponse("Error processing webhook", { status: 500 });
  }
}
