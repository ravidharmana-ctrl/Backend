const mongoose = require("mongoose");

const connectDB = async ()=>{
  await mongoose.connect("mongodb+srv://user_name_db_user:password@hellonode.qbo56m4.mongodb.net/devTinder");

};

module.exports = connectDB;