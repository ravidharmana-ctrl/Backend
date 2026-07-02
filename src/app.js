const express = require("express");

//create new application of express

const app = express();

// Handle Auth middleware for GET<POST,.. requests

app.use("/admin",(req,res, next)=>{
   console.log("admin auth is getting checked");
   const token = "xyz";
  const isAdminAuthorized = token === "xyz";

  if(!isAdminAuthorized){
   res.status(401).send("unauthorized request");
  }
  else{
   next();
  }
});

app.get("/user", (req,res)=>{
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