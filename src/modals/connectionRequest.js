const mongoose = require("mongoose");
const { applyTimestamps } = require("./user");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },

    toUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum:{
            values :["ignored", "intrested" , "accepted", "rejected"],
            message : `{VALUE} is incorrect status type`
        },
    },

},

{ Timestamps : true}
);     

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save", async function (){
    const connectionRequest = this;
 // check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself!");
    }
});

const  ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;