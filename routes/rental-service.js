const express       = require("express"),
      router        = express.Router(),
      UserDetails   = require("../models/userDetails"),
      User          = require("../models/users"),
      Middleware    = require("../middleware/index");


//user selects the equipments and city
router.get("/getrentalservice",function(req,res){
	res.sendFile("./views/find-equip.html" , {root:__dirname + "/.."});
});


//this is the heart of the app..you have to add price demanded by the owner and sort the list while rendering
router.post("/getrentalservice", function(req,res){
	const equipname = {name:req.body.equipname,state:1};
	const city      = req.body.city;
	console.log(equipname);
	UserDetails.find({equipments: {$elemMatch:equipname} , city:city}, function(err,userlist){
		if(err){
			res.redirect("/sample");
		}else{
			res.render("displaylistofrentals",{users:userlist});	
		}
	});
});

module.exports = router;