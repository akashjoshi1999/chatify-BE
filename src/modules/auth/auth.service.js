const userRepo = require("./auth.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("../../config");
const { generateAccessToken, generateRefreshToken } = require("./auth.tokens");

/**
 * LOGIN
 */
exports.login = async ({ email, password }) => {
  const user = await userRepo.findByEmailWithPassword(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await userRepo.updateById(user._id, {
    refreshToken: hashedRefreshToken,
  });

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * SIGN UP
 */
exports.signUp = async ({ email, password, name }) => {
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await userRepo.createUser({
    name,
    email,
    password: hashed,
  });

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await userRepo.updateById(user._id, {
    refreshToken: hashedRefreshToken,
  });

  return {
    message: "User registered successfully",
    accessToken,
    refreshToken,
  };
};

/**
 * REFRESH TOKEN
 */
exports.refreshToken = async ({ refreshToken }) => {
  const decoded = verifyToken(refreshToken, auth.JWT_REFRESH_SECRET);

  const user = await userRepo.findById(decoded.id);
  if (!user || !user.refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const isValid = await bcrypt.compare(refreshToken, user.refreshToken);

  if (!isValid) {
    throw new Error("Invalid refresh token");
  }

  // rotate tokens
  const newAccessToken = generateAccessToken({ id: user._id });
  const newRefreshToken = generateRefreshToken({ id: user._id });

  await userRepo.updateById(user._id, {
    refreshToken: await bcrypt.hash(newRefreshToken, 10),
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

/**
 * GET ME
 */
exports.getMe = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

/**
 * FORGOT PASSWORD
 */
exports.forgotPassword = async ({ email }) => {
  // generate reset token & email
  return { message: "Password reset link sent" };
};

/**
 * RESET PASSWORD
 */
exports.resetPassword = async ({ token, password }) => {
  // verify token
  // hash password
  return { message: "Password reset successful" };
};

/**
 * CHANGE PASSWORD
 */
exports.changePassword = async ({ userId, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  await userRepo.updateById(userId, { password: hashed });
  return { message: "Password changed successfully" };
};

/**
 * VERIFY EMAIL
 */
exports.verifyEmail = async ({ token }) => {
  return { message: "Email verified successfully" };
};

/**
 * LOGOUT
 */
exports.logout = async (userId) => {
  await userRepo.updateById(userId, { refreshToken: null });
  return true;
};
