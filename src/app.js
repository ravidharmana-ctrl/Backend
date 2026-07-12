const express = require("express");
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

const connectDB = require("./config/database");
const app = express();
const User =require("./modals/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt =require("bcrypt");
const cookieParser = require("cookie-parser");  
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req,res)=>{
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

app.post("/login", async (req,res)=> { 
  try{
    const {emailId,password} =req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){

      //Create a jwt token 
      const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790");
      


      //Add the token to cookie and send the response to the user

      res.cookie("token",token );
      
      res.send("Login successfull!!");

    }else{
      throw new Error("Invalid credentials");
    }
  }catch(err){
    res.status(400).send("Error:" + err.message);
  }
});

app.get("/profile", userAuth, async (req,res)=>{
  try{
   const user = req.user; 
  res.send(user);
  }
  catch(err){
     res.status(400).send("Error:" + err. message);
  }
})
 

app.get("/user", async (req,res)=>{
  const userEmail = req.body.emailId;
try{
  console.log(userEmail);
  const user = await User.findOne({emailId:userEmail});
  res.send(user);
//   if(users.length=== 0){
//     res.status(404).send("user not found");
//   }
//   else{
//     res.send(users);
//   }
  
 }
catch(err){
  res.status(400).send("someting went wrong");

}
});
// to get all the users from the database
app.get("/feed",async (req,res)=>{
 try{
  const users = await User.find({});
  res.send(users);

 }
 catch(err){
  res.status(404).send("something went wrong");
 }
});

app.delete("/user",async (req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    // const user = await User.findByIdAndDelete({_id:userId});
    res.send("user deleted successfully");
  }
  catch(err){
    res.status(404).send("something went wrong");
  }
});

app.patch("/user/:userId",async (req,res)=>{
  const userId =req.params?.userId;
  const data = req.body;

  try{
    const ALLOWED_UPDATES = [
    "photoUrl",
     "about",
     "gender",
     "age",
     "skills",
  ];

  const isUpdateAllowed = Object.keys(data).every((k)=>
  ALLOWED_UPDATES.includes(k)
  );
  if(!isUpdateAllowed){
    throw new Error("update not allowed");
  }
  if(data?.skills.length >10){
    throw new Error("Skills cannot be more than 10");
  }
   const user = await User.findByIdAndUpdate({_id:userId},data,{
      returnDocument: "after",
      runValidators:true,
    });
    // const user = await User.findByIdAndDelete({_id:userId});
    console.log(user);
    res.send("user updated successfully");
  }
  catch(err){
    res.status(404).send("Updae is failed: " + err.message);
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
  console.error("actual error", err.message);
})

