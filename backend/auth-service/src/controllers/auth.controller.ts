import { AuthUser } from "../models/AuthUser.model";
import dotenv from "dotenv";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { kafkaProducer } from "../kafka/kafkaClient";
import { getExpirySeconds, getMs } from "../utils/tokenUtils";
import axios from "axios";
dotenv.config();

export const register = async (req: any, res: any) => {
  const { email, password, name, phone, dob, role } = req.body;

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

  let newUser: any = null;

  try {
    const existingUser = await AuthUser.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // console.log("creating new user");

    newUser = new AuthUser({
      email,
      password,
    });

    await newUser.save();

    //* kafka
    //* We can use this if we want to setup kafka
    // await kafkaProducer.send({
    //   topic: "user_registered",
    //   messages: [
    //     {
    //       key: String(newUser._id),
    //       value: JSON.stringify({
    //         userId: newUser._id,
    //         name: req.body.name,
    //         email: newUser.email,
    //         phone: req.body.phone,
    //         dob: req.body.dob,
    //         role: req.body.role || "student",
    //         isVerified: newUser.isVerified,
    //       }),
    //     },
    //   ],
    // });
    // console.log("📤 Event sent: user_registered");
    // console.log("registered success", newUser, accessToken, refreshToken);
    // console.log("registered success");

    //* since user registered for auth model
    //* lets request to user-service for making the profile if we dont want to use kafka

    const userServiceResponse = await axios.post(
      `${process.env.USER_SERVICE_URL}/api/v1/user/create-profile`,
      {
        userId: newUser._id,
        name: req.body.name,
        email: newUser.email,
        phone: req.body.phone,
        dob: req.body.dob,
        role: req.body.role || "student",
        isVerified: newUser.isVerified,
      }
    );

    if (!userServiceResponse.data.success) {
      // console.log("User service profile creation failed, deleting auth user");
      await AuthUser.findByIdAndDelete(newUser._id);
      return res.status(500).json({
        success: false,
        message: "Failed To create user. Please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
      // verificationToken, // This should be sent via email in a real application
    });
  } catch (error) {
    // console.log("error", error);
    if (newUser && newUser._id) {
      try {
        await AuthUser.findByIdAndDelete(newUser._id);
        // console.log("Deleted AuthUser due to error during profile creation");
      } catch (deleteError) {
        console.log("Error deleting user after failure:", deleteError);
      }
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};
export const logout = async (req: any, res: any) => {
  try {
    const userId = await req.user?.id; // Extract user ID from `req.user` (middleware should add this)

    if (!userId) {
      console.log("userId", userId);

      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    //* FOR PRODUCTION
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    //* FOR LOCALHOST
    // res.clearCookie("refreshToken", {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   path: "/",
    // });
    // res.clearCookie("accessToken", {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   path: "/",
    // });

    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    // console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!loginSchema.safeParse(req.body).success) {
    // console.log("error in login schema validation");

    return res.status(500).json({
      success: false,
      message: "Validation Fails",
      error: registerSchema.safeParse(req.body).error,
    });
  }

  try {
    // Check if user exists
    const user = await AuthUser.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = generateRefreshToken(String(user._id));

    // ✅ Set cookies using expiry from .env (convert to ms if needed)
    const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "45m";
    const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

    //* FOR PRODUCTION
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    //* ONLY FOR LOCALHOST
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: false, // ✅ false for localhost
    //   sameSite: "lax", // ✅ 'lax' is safer for dev
    //   path: "/",
    //   maxAge: getMs(REFRESH_TOKEN_EXPIRY), // 7days (in ms)
    // });
    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: false, // ✅ false for localhost
    //   sameSite: "lax", // ✅ 'lax' is safer for dev
    //   path: "/",
    //   maxAge: getMs(ACCESS_TOKEN_EXPIRY), // minutes (in ms)
    // });

    // Update refreshtoken in db
    user.refreshToken = refreshToken;
    await user.save();

    // console.log("Login Succcess");

    const currentTime = Math.floor(Date.now() / 1000); // in seconds

    const accessTokenExpiryTime =
      currentTime + getExpirySeconds(ACCESS_TOKEN_EXPIRY);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
      accessToken,
      accessTokenExpiryTime,
    });
  } catch (error) {
    // console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const refreshAccessToken = async (req: any, res: any) => {
  const refreshToken = req.cookies?.refreshToken;
  // console.log("refreshToken", refreshToken);

  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token missing" });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) {
        // console.log("err verify", err);

        return res.status(403).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
      }

      const userId = decoded.userId;
      // console.log("userID", decoded.userId);

      const user = await AuthUser.findById(userId);
      const storedRefreshTokenInDB = user?.refreshToken;
      // console.log("storedRefreshTokenInDB", storedRefreshTokenInDB);

      if (!storedRefreshTokenInDB) {
        return res.status(403).json({
          success: false,
          message: "Error validating refresh token",
        });
      }
      if (storedRefreshTokenInDB !== refreshToken) {
        // console.log("stored token is not matches with refreshtoken");
        return res.status(403).json({
          success: false,
          message: "Invalid session, please log in again",
        });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(String(userId));
      const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";
      // console.log("new accessToken", newAccessToken);

      //* FOR PRODUCTION
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      //* FOR LOCALHOST
      // res.cookie("accessToken", newAccessToken, {
      //   httpOnly: true,
      //   secure: false, // ✅ false for localhost
      //   sameSite: "lax", // ✅ 'lax' is safer for dev
      //   path: "/",
      //   maxAge: getMs(ACCESS_TOKEN_EXPIRY), // minutes (in ms)
      // });

      const currentTime = Math.floor(Date.now() / 1000); // in seconds
      const accessTokenExpiryTime =
        currentTime + getExpirySeconds(ACCESS_TOKEN_EXPIRY);

      return res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        accessTokenExpiryTime,
      });
    }
  );
};

export const verifyToken = async (req: any, res: any) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No Token Provided in Verify Token" });
  }

  try {
    // verify token
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    // attach user to request
    const user = await AuthUser.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Authenticated User not found" });
    }
    // console.log("Token Verified at Auth for gateway", user);

    return res.status(200).json({
      success: true,
      message: "Token Verified",
      user,
    });
  } catch (error) {
    // console.log("Error verify token", error);

    // Check for token expiration or invalid token
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
