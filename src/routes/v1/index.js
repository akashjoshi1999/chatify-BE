const express = require('express');

const router = express.Router();
const authRoutes = require('./auth');
const messageRoutes = require('./message');

// to check the status of API
router.get('/status', (req, res) => {
    res.status(200).json({
        message: 'OK'
    })
});

// auth route : api/v1/auth/
router.use('/auth', authRoutes);

router.use('/message', messageRoutes);

module.exports = router;