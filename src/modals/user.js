const mongoose =require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type : String,
        required:true,
    },
    emailId:{
        type : String,
        required: true,
        unique :true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invallid email address:" + value);
            }
        }
    },
    age :{
        type: Number,
        min:18,
        max:100, 
    },
   gender:{
    type : String,
    //custom validation
    validate(value){
        if(!["male", "female","other"].includes(value)){
            throw new Error("Gender data is not valid");
        }
    },
   },
   password:{
    type:String,
    required:true,
    validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("not a strong password, please enter strong password:" + value);
            }
        }
   },
   phoneNumber:{
    type: Number,
   },
   photoUrl:{
    type:String,
    default:"https://www.shutterstock.com/image-vector/isolated-object-avatar-dummy-symbol-260nw-1290296656.jpg",
    validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid photo Url:" + value);
            }
        }
   },
   about:{
    type: String,
    default: "This is the Default of the User!",
   },
   skills:{
    type:[String],
   },
},{
    timestamps:true,
});

// const User = mongoose.model("User",userSchema);
// module.exports = User;

module.exports =mongoose.model("User",userSchema);