const { User } = require("../models/user.model");

const { options } = require("../utils/constants");

const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

const jwt = require("jsonwebtoken");

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};
const registerUser = async (req, res) => {
  try {
    const { fullName, email, username, password, role } = req.body;

    // Check if all required fields are provided
    if ([fullName, email, username, password].some((field) => !field?.trim())) {
      return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      return res.status(409).json(new ApiResponse(409, null, "User with email or username already exists"));
    }

    const user = await User.create({
      fullName,
      email,
      password,
      username: username.toLowerCase(),
      role: role || "customer", // Default to "customer" if role is not provided
    });

    const createdUser = user.toObject();
    delete createdUser.password;
    delete createdUser.refreshToken;

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Error registering user"));
  }
};


const loginUser = async (req, res) => {
  try {
    const { email,  password } = req.body;
    console.log("req.body ",req.body);

    if (!email) {
      throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
      $or: [{ email }],
    });

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password); //already defined in user.model

    if (!isPasswordValid) {
      throw new ApiError(404, "Password incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = user.toObject();
    delete loggedInUser.password;
    delete loggedInUser.refreshToken;

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          "User logged in successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while logging in  user",
      error
    );
  }
};

const logoutUser = async (req, res) => {
  try {
    const id = req.user._id;
    await User.findByIdAndUpdate(
      id,
      { $unset: { refreshToken: 1 } }, //unset remove a field from the document
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged Out"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong logout  user", error);
  }
};

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken; //cookies in case of smartphone
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh request");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token", error);
  }
};

const changeCurrentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    throw new ApiError(500, "Error changing password", error);
  }
};

const getCurrentUser = async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
};
const updateAccountDetails = async (req, res) => {
  try {
    const { fullName, email, role } = req.body;

    // Check if fullName and email are provided
    if (!fullName || !email) {
      throw new ApiError(400, "Full name and email are required");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id, // Current user's ID
      {
        $set: {
          fullName,
          email,
          role: role || req.user.role, // Keep existing role if not provided
        },
      },
      { new: true, select: "-password" }
    );

    return res.status(200).json(new ApiResponse(200, updatedUser, "Account details updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Error updating account details", error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
};
