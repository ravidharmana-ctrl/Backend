const mongoose = require("mongoose");

const connectDB = async ()=>{
  await mongoose.connect("mongodb+srv://ravikumardharmana258_db_user:b4AGQXcP5P6FTQ6H@hellonode.qbo56m4.mongodb.net/devTinder");

};

module.exports = connectDB;