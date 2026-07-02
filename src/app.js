const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");


//create new application of express

const app = express();

// Handle Auth middleware for GET<POST,.. requests

app.use("/admin",adminAuth);
// app.use("/user",userAuth);

app.get("/user/login", (req,res)=>{
   res.send("user logged in successfully");
});
app

app.get("/user/data",userAuth, (req,res)=>{
   res.send("user data sent");
});
app.get("/admin/getAllData", (req,res)=>{
   res.send("All data sent");
});

app.get("/admin/deleteuser", (req,res)=>{ 
  res.send("Delete a user");  
});


app.listen(8888, ()=>{
    console.log("server is successfully listen at port 8888...");
});