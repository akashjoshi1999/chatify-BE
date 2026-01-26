const userRepo = require('./auth.repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth } = require('../../config');

/**
 * LOGIN
 */
exports.login = async ({ email, password }) => {
  const user = await userRepo.findByEmailWithPassword(email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const JWT_SECRET = auth.JWT_SECRET;

  const token = jwt.sign(
    { id: user._id }, JWT_SECRET, { expiresIn: '15m' }
  );

  return { token };
};

/**
 * SIGN UP
 */
exports.signUp = async ({ email, password, name }) => {
  const existing = await userRepo.findByEmailWithPassword(email);
  if (existing) {
    throw new Error('User already exists');
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser({
    name,
    email,
    password: hashed
  });

  return {
    message: 'User registered successfully',
    userId: user._id
  };
};

/**
 * REFRESH TOKEN
 */
exports.refreshToken = async ({ refreshToken }) => {
  // validate refresh token (store hashed in DB ideally)
  return {
    token: 'new-access-token'
  };
};

/**
 * GET ME
 */
exports.getMe = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) throw new Error('User not found');
  return user;
};

/**
 * FORGOT PASSWORD
 */
exports.forgotPassword = async ({ email }) => {
  // generate reset token & email
  return { message: 'Password reset link sent' };
};

/**
 * RESET PASSWORD
 */
exports.resetPassword = async ({ token, password }) => {
  // verify token
  // hash password
  return { message: 'Password reset successful' };
};

/**
 * CHANGE PASSWORD
 */
exports.changePassword = async ({ userId, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  await userRepo.updateById(userId, { password: hashed });
  return { message: 'Password changed successfully' };
};

/**
 * VERIFY EMAIL
 */
exports.verifyEmail = async ({ token }) => {
  return { message: 'Email verified successfully' };
};

/**
 * LOGOUT
 */
exports.logout = async (userId) => {
  // invalidate refresh token
  return true;
};
