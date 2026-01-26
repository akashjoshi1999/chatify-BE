const express = require("express");

const router = express.Router();
const authRoutes = require("./auth/auth.route.js");
const messageRoutes = require("./message/message.route.js");

// to check the status of API
router.get("/status", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "api",
    version: "v1",
    timestamp: new Date().toISOString(),
  });
});

// auth route : api/v1/auth/
router.use("/auth", authRoutes);

// message route : api/v1/message/
router.use("/message", messageRoutes);

module.exports = router;
