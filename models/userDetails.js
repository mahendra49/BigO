const mongoose  = require("mongoose");

var userDetails = new mongoose.Schema({
	firstname	: String,
	lastname	: String,
	email		: {
		unique : true,
		type   : String
	},
	number		: String,
	city		: String,
	equipments  : [{
		name:String,
		state:{type:Number,default: 0}
	}]

});

module.exports = mongoose.model('UserDetails',userDetails);