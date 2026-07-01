const express = require("express");

//create new application of express

const app = express();

app.use("/user", 
    (req,res, next)=>{
    console.log("handling route 1");
    // res.send("response!!");
    next();

},
 
 (req,res,next)=>{
    console.log("handling route 2");
    // res.send("2nd response");
    next();
 },
 (req,res,next)=>{
    console.log("handling route 3");
    // res.send("3nd response");
    next();
 },
 (req,res,next)=>{
    console.log("handling route 4");
    // res.send("4nd response");
    next();
 },
 (req,res,next)=>{
    console.log("handling route 5");
     res.send("5nd response");
     next();
 }
);


app.listen(8888, ()=>{
    console.log("server is successfully listen at port 8888...");
});