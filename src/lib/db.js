const mongoose = require('mongoose');
const { database } = require('../config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(database.MONGO_URL);
    console.log('MongoDB connected:', conn.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = {
  connectDB
};
