const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
    },
    lastName:{
        type : String,
    },
    emailId:{
        type : String,
    },
    age :{
        type: Number,
    },
   gender:{
    type : String,
   },
   phoneNumber:{
    type: Number,
   }
   

});

// const User = mongoose.model("User",userSchema);
// module.exports = User;

module.exports =mongoose.model("User",userSchema);