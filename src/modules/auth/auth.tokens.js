const jwt = require("jsonwebtoken");
const { auth } = require("../../config");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, auth.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, auth.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
