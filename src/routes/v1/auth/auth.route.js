const express = require('express');
const router = express.Router();

const {
  login,
  signUp,
  refreshToken,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  logout
} = require('../../../modules/auth');

const validator = require('../../../modules/auth/auth.validator');
const { authenticate } = require('../../../modules/auth/auth.middleware');

router.post('/login', validator.login, login);
router.post('/sign-up', validator.signUp, signUp);
router.post('/refresh-token', validator.refreshToken, refreshToken);
router.get('/me', authenticate, getMe);
router.post('/forgot-password', validator.forgotPassword, forgotPassword);
router.post('/reset-password', validator.resetPassword, resetPassword);
router.post('/change-password', authenticate, validator.changePassword, changePassword);
router.post('/verify-email', validator.verifyEmail, verifyEmail);
router.post('/logout', authenticate, logout);

module.exports = router;
