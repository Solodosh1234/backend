const mongoose = require("mongoose");
require("dotenv").config()
const database_url = process.env.DATABASE_URL


async function connectDB() {
  try {
    await mongoose.connect(database_url);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1); // Exit on failure
  }
}







module.exports = connectDB