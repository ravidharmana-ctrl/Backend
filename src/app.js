const express = require("express");

//create new application of express

const app = express();
app.use("/hello",(req, res)=>{
    res.send("Hlooo");
});

app.use("/test",(req, res)=>{
    res.send("hello from server");
});

app.use("/",(req, res)=>{
    res.send("heyyy namastea from dashboard");
});


app.listen(8888, ()=>{
    console.log("server is successfully listen at port 8888...");
});