import { AuthUser } from "../models/AuthUser.model";
import dotenv from "dotenv";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
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
export const logout = async (req: any, res: any) => {
  try {
    const userId = await req.user?.id; // Extract user ID from `req.user` (middleware should add this)

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // TODO: If using REDIS then remove Refres Token from redis also

    // Clear refresh token cookie from client
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!loginSchema.safeParse(req.body).success) {
    console.log("error in login schema validation");

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

    // TODO: Stroring Refresh Token in REDIS

    // TODO: JAB PRODUCTIOn ME JAE TAB BELOW PART UNCOMMENT KR DENA " Set refresh token as an HTTP-only cookie
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   path: "/",
    // });

    // TODO: ONLY FOR LOCALHOST: production me jane ke liye niche wala part comment kr dena
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // ✅ false for localhost
      sameSite: "lax", // ✅ 'lax' is safer for dev
      path: "/",
    });

    // Update refreshtoken in db

    user.refreshToken = refreshToken;
    await user.save();

    console.log("Login Succcess");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const refreshAccessToken = async (req: any, res: any) => {
  const refreshToken = req.cookies?.refreshToken;
  console.log("refreshToken", refreshToken);

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
        console.log("err verify", err);

        return res.status(403).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
      }

      const userId = decoded.userId;
      console.log("userID", decoded.userId);

      const user = await AuthUser.findById(userId);
      const storedRefreshTokenInDB = user?.refreshToken;
      console.log("storedRefreshTokenInDB", storedRefreshTokenInDB);

      if (!storedRefreshTokenInDB) {
        return res.status(403).json({
          success: false,
          message: "Error validating refresh token",
        });
      }
      if (storedRefreshTokenInDB !== refreshToken) {
        console.log("stored token is not matches with refreshtoken");
        return res.status(403).json({
          success: false,
          message: "Invalid session, please log in again",
        });
      }

      // Generate new access token

      const newAccessToken = generateAccessToken(String(userId));
      console.log("new accessToken", newAccessToken);

      return res.status(200).json({
        success: true,
        accessToken: newAccessToken,
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
    console.log("Token Verified at Auth for gateway", user);

    return res.status(200).json({
      success: true,
      message: "Token Verified",
      user,
    });
  } catch (error) {
    console.log("Error verify token", error);

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
