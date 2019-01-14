const mongoose  =  require("mongoose");

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
		type:String
	}]

});

module.exports = mongoose.model('UserDetails',userDetails);