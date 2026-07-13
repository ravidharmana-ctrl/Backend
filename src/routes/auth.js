const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User =require("../modals/user");
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req,res)=>{
  // console.log(req.body);
    try{
     //validation of data
      validateSignUpData(req);
    
    const {firstName,lastName,emailId,password}= req.body;
   //Encrypt the password
   const passwordHash = await bcrypt.hash(password, 10);
   console.log(passwordHash);

  const user = new User({
    firstName, lastName,emailId,password:passwordHash,
  });


    await user.save();
  res.send("user data added successfully");
  }
  catch(err){
    res.status(500).send("Error:" + err.message);
    
  }
   
});

authRouter.post("/login", async (req,res)=> { 
  try{
    const {emailId,password} =req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validateapassword(password);

    if(isPasswordValid){

      const token = await user.getJWT();

      res.cookie("token",token ,{expires: new Date(Date.now()+ 8 * 3600000)});
      
      res.send("Login successfull!!");

    }else{
      throw new Error("Invalid credentials");
    }
  }catch(err){
    res.status(400).send("Error:" + err.message);
  }
});

module.exports = authRouter;