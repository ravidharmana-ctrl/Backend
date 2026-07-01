const express = require("express");

//create new application of express

const app = express();

app.get(/ab?c/, (req,res)=>{
    res.send({firstName:"Ravi", lastName:"Kumar"});
});

app.get(/ab+cd/, (req,res)=>{
    res.send({firstName:"Ravi", lastName:"Kumar"});
});

app.get(/a(bc)?d/, (req,res)=>{
    res.send({firstName:"Ravi", lastName:"Kumar"});
});

app.get(/user.*profile/, (req,res)=>{
    res.send({firstName:"Ravi", lastName:"Kumar"});
});
app.get(/.*fly/, (req,res)=>{
    res.send({firstName:"Ravi", lastName:"Kumar"});
});
app.get("/user", (req,res)=>{
    console.log(req.query);
    res.send({firstName:"Ravi", lastName:"Kumar"});
});
app.get("/user/:userId/:name/:password", (req,res)=>{
    console.log(req.params  );
    res.send({firstName:"Ravi", lastName:"Kumar"});
});


app.get(/.*/, (req, res) => {
  res.status(404).send('Page Not Found');
});


app.listen(8888, ()=>{
    console.log("server is successfully listen at port 8888...");
});