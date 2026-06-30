const express = require("express");

//create new application of express

const app = express();

app.get("/user", (req,res)=>{
    res.send({firstName:"Ravi", lastName:"Kumar"});
});

app.post("/user", (req,res)=>{
    res.send("data successfully saved to database");
});

app.delete("/user", (req,res)=>{
    res.send("data deleted successfullly");
});
app.patch("/user", (req,res)=>{
    res.send("data updated  successfullly");
});



app.use("/test",(req, res)=>{
    res.send("heyyy namastea from dashboard");
});


app.listen(8888, ()=>{
    console.log("server is successfully listen at port 8888...");
});