var mongoose              = require("mongoose"),
    passportlocalmongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({

    username:{
        type:String,
        unique:true
    },
    password:String,
    email:{
        type:String,
        unique:true
    }
});

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User",userSchema);