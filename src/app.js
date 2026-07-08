const express = require("express");
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

const connectDB = require("./config/database");
const app = express();
const User =require("./modals/user");
const { after } = require("node:test");
app.use(express.json());

app.use("/signup", async (req,res)=>{
  // console.log(req.body);
  const user = new User(req.body);
  try{
    await user.save();
  res.send("user data added successfully");
  }
  catch(err){
    res.status(500).send("error saving the user " + err.message);
    
  }
   
});

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

app.patch("/user",async (req,res)=>{
  const userId =req.body.userId;
  const data = req.body;
  // console.log(data);
  try{
    const user = await User.findByIdAndUpdate({_id:userId},data,{
      returnDocument: "after",
      runValidators:true,
    });
    // const user = await User.findByIdAndDelete({_id:userId});
    console.log(user);
    res.send("user updated successfully");
  }
  catch(err){
    res.status(404).send("something went wrong");
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

