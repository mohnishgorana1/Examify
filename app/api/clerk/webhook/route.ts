import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { createAccountInDatabase } from "@/actions/user.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing Clerk Webhook Secret");
  }

  try {
    const payload = await req.text();
    const heads = new Headers(req.headers); // ✅ safe + simple

    const svix_id = heads.get("svix-id");
    const svix_timestamp = heads.get("svix-timestamp");
    const svix_signature = heads.get("svix-signature");

    // Validate Clerk webhook headers
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse("Missing svix headers", { status: 400 });
    }

    // Verify the webhook signature
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    const { type, data } = evt as {
      type: string;
      data: Record<string, any>;
    };

    // Handle user creation event
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
      const email =
        email_addresses?.[0]?.email_address || "";
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
        console.error("❌ Failed to create user in DB:", result.message);
        // TODO: Optionally delete Clerk user here using Clerk API to stay in sync
        // await clerkClient.users.deleteUser(id);

        return NextResponse.json(
          {
            success: false,
            message: "User creation failed in MongoDB",
            dbResponse: result,
          },
          { status: result.status }
        );
      }

      // User successfully created
      console.log("✅ User stored in DB successfully:", email);
      return NextResponse.json(
        {
          success: true,
          message: "User created successfully in both Clerk and MongoDB",
          data: result.data,
        },
        { status: 201 }
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
