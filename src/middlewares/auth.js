const jwt = require("jsonwebtoken");
const User = require("../modals/user");
const userAuth = async(req,res, next)=>{
//Read the token from the request cookies

// const cookies = req.cookies;

try{
const {token } = req.cookies;
if(!token){
  throw new Error("Token is not valid!!");
}

const decodedObj = await jwt.verify(token,"DEV@Tinder$790");
const {_id} = decodedObj;

const user = await User.findById(_id);

if(!user){
  throw new Error("user not present");
}

req.user = user;
next();
}catch(err){
  res.status(400).send("Error:" +err.message);
}
//validate the token
//find the user
};

module.exports = { userAuth};