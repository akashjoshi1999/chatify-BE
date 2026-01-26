const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    APP_ENV: process.env.APP_ENV || 'development'
};
