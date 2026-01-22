const express = require('express');

const router = express.Router();

// /api/v1/message/send POST Request
router.post('/send', (req, res) => {
    res.send('send message');
});

// /api/v1/auth/receive POST Request
router.post('/receive', (req, res) => {
    res.send('receive message');
});

module.exports = router; 