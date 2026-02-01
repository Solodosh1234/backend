const mongoose = require("mongoose");
require("dotenv").config()
const database_url = process.env.DATABASE_URL

const connectDb =async ()=>{
  try {
    await mongoose.connect(database_url)
  } catch (err) {
    console.error('Error:', err);
  }
} 

module.exports = connectDb