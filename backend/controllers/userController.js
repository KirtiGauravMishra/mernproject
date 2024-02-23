import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import RefreshToken from "../models/refreshTokenSchema.js";
import jwt from "jsonwebtoken";

export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return next(new ErrorHandler("Please fill full form!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return next(new ErrorHandler("Email is already taken!"));
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });
    user.password = undefined;
    res.status(201).json({ user });
  });

  
  export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return next(new ErrorHandler("Please provide email ,password and role."));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    if (user.role !== role) {
      return next(
        new ErrorHandler(`User with provided email and ${role} not found!`, 404)
      );
    }
    user.password = undefined;
    sendToken(user, 201, res, "User Logged In!");
  });


  export const refreshAccessToken = catchAsyncErrors(async (req, res, next) => {
    const {refreshToken,userId } = req.body;
    if (!refreshToken || !userId) {
      return next(new ErrorHandler('Refresh token or userId not provided', 400));
    }
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const refreshTokenRecord = await RefreshToken.findOne({ token: refreshToken });
      console.log(refreshTokenRecord)
      if (!refreshTokenRecord) {
        return next(new ErrorHandler('Invalid refresh token', 401));
      }
      if (new Date() > decoded.exp * 1000) {
        await RefreshToken.deleteOne({ _id: refreshTokenRecord._id });
        return next(new ErrorHandler('Refresh token has expired', 401));
      }
      const user = await User.findById(userId);
      if (!user) {
        return next(new ErrorHandler('User not found', 404));
      }
      sendToken(user,201,res,"successfully created new access and refresh token!");
    })



  export const logout = catchAsyncErrors(async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next(new ErrorHandler('Refresh token not provided', 400));
    }
    try {
      // Find the refresh token document based on the provided token
      const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken });
      if (!refreshTokenDoc) {
        return next(new ErrorHandler('Invalid refresh token', 401));
      }
      // Delete the refresh token document associated with the userId
      await RefreshToken.deleteOne({ userId: refreshTokenDoc.userId });
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.status(201).cookie("token","",{
          httpOnly: true,
          expires: new Date(Date.now()),
        }).json({
          success: true,
          message: "Logged Out Successfully.",
        });
      }
    catch (error) {
      return next(new ErrorHandler('Error logging out', 500));
    }
  });

  