const express = require("express");
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

const connectDB = require("./config/database");
const app = express();
const User =require("./modals/user");

app.use("/signup", async (req,res)=>{
  const user = new User({
    firstName : "Dharmana",
    lastName:"ravikumar",
    emailId: "ravikumardharmana25@gmail.com",
    password:"ravikumar",
    phoneNumber:"7658904332"
  });
  try{
    await user.save();
  res.send("user data added successfully");
  }
  catch(err){
    res.status(500).send("error saving the user " + error.message);
  }
   
});


connectDB().then(()=>{
  console.log("database established successfully..");
  app.listen(8888,()=>{
  console.log("server listens port at 8888..");
})
})
.catch((err)=>{
  console.error("database cannot be established");
  console.error("actual error", err);
})

