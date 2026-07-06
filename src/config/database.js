const mongoose = require("mongoose");

const connectDB = async ()=>{
  await mongoose.connect("mongodb+srv://ravikumardharmana258_db_user:56di3ApsTxuEOdJq@hellonode.qbo56m4.mongodb.net/devTinder");

};

module.exports = connectDB;