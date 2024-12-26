const { User } = require("../models/user.model");

const { ApiError } = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("accessToken ", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};

// Middleware to check if user has admin role
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    // Assuming 'role' is stored in the user model
    return next();
  }
  throw new ApiError(403, "Forbidden: Admin access required");
};

module.exports = { verifyJWT, admin };
