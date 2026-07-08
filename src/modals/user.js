const mongoose =require("mongoose");

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
   },
   phoneNumber:{
    type: Number,
   },
   photoUrl:{
    type:String,
    default:"https://www.shutterstock.com/image-vector/isolated-object-avatar-dummy-symbol-260nw-1290296656.jpg",
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