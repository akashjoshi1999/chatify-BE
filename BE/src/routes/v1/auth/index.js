const express = require('express');

const router = express.Router();

// /api/v1/auth/login POST Request
router.post('/login', (req, res) => {
    res.sendFile('Sucess');
});

// /api/v1/auth/sign-up POST Request
router.post('/sign-up', (req, res) => {
    res.sendFile('Sucess');
});

// /api/v1/auth/forgot-password POST Request
router.post('/forgot-password', (req, res) => {
    res.sendFile('Sucess');
});

// /api/v1/auth/reset-password POST Request
router.post('/reset-password', (req, res) => {
    res.sendFile('Sucess');
});

// /api/v1/auth/logout POST Request
router.post('/logout', (req, res) => {
    res.sendFile('Sucess');
});

module.exports = router; 