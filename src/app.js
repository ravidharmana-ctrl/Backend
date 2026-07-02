const express = require("express");


//create new application of express

const app = express();

app.use("/",(err,req,res,next)=>{
   if(err){
      // alo log errors and can send some alarts
      
      res.status(500).send("something went wrong");
   }
});


app.get("/getUserData", (req,res)=>{
   // try{
      throw new Error("hgdsjfg");
      res.send("user Data sent");
    
   // }
   // catch(err){
   //    res.status(500).send("some Eroor contact support team")
   // }
   res.send("user Data sent");
});

app.use("/",(err,req,res,next)=>{
   if(err){
      // alo log errors and can send some alarts
      res.status(500).send("something went wrong");
   }
});


app.listen(8888, ()=>{
    console.log("server is successfully listen at port 8888...");
});