const express = require("express");
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");  
const cors = require("cors");
require("dotenv").config();

app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require('./routes/profile');
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter); 
app.use("/",userRouter); 



connectDB().then(()=>{
  console.log("database established successfully..");
  app.listen(process.env.PORT,()=>{
  console.log("server listens port at 8888..");
})
})
.catch((err)=>{
  console.error("database cannot be established");
  console.error("actual error", err.message);
})

