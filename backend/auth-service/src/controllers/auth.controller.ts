import { AuthUser } from "../models/AuthUser.model";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { kafkaProducer } from "../kafka/kafkaClient";
dotenv.config();

export const register = async (req: any, res: any) => {
  const { email, password, name, phone, dob, role } = req.body;

  console.log("register data: ", email, password, name, phone, dob);

  // zod validations
  if (!registerSchema.safeParse(req.body).success) {
    console.log(
      "error in schema validation",
      registerSchema.safeParse(req.body).error
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: registerSchema.safeParse(req.body).error,
    });
  }

  try {
    const existingUser = await AuthUser.findOne({ email });
    console.log("Existing", existingUser);

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // console.log("creating new user");

    const newUser = new AuthUser({
      email,
      password,
    });

    // generate JWT TOKENS
    console.log("generating tokens");

    const accessToken = generateAccessToken(String(newUser._id));
    const refreshToken = generateRefreshToken(String(newUser._id));

    newUser.refreshToken = refreshToken;
    await newUser.save();

    // TODO: REDIS : storing refreshtoken in redis later onwards!

    // kafka

    await kafkaProducer.send({
      topic: "user_registered",
      messages: [
        {
          key: String(newUser._id),
          value: JSON.stringify({
            userId: newUser._id,
            name: req.body.name,
            email: newUser.email,
            phone: req.body.phone,
            dob: req.body.dob,
            role: req.body.role || "student",
            isVerified: newUser.isVerified,
          }),
        },
      ],
    });

    console.log("📤 Event sent: user_registered");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // console.log("registered success", newUser, accessToken, refreshToken);
    console.log("registered success");

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
      accessToken,
      // verificationToken, // This should be sent via email in a real application
    });
  } catch (error) {
    console.log("error", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};
