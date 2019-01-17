const express       = require("express"),
      router        = express.Router(),
      UserDetails   = require("../models/userDetails"),
      User          = require("../models/users"),
      Middleware    = require("../middleware/index");


//show the list of options and let user update
router.get("/updaterentals", Middleware.isLoggedIn, function(req,res){
    UserDetails.findOne({email:req.user.email} , function(err,userdetails){
        res.render("select-rentals",{equips:userdetails.equipments});
    });
});

//update the list of items available
router.post("/updaterentals", Middleware.isLoggedIn , function(req,res){
    const avaiList = Object.keys(req.body);
    UserDetails.findOne({email:req.user.email} , function(err,userdetails){
        userdetails.equipments.forEach(function(item){
            item.state = 0;
        });
        userdetails.equipments.forEach(function(item){
            if(avaiList.includes(item.name)){
                item.state = 1;
            }
        });
        userdetails.save(function(err){
            if(err){
                res.redirect("/");
            }
            else{
                res.send("wait");        
            }
        });
    });
});

//for getting details of user right after registration or updation(any time after registraion)
router.get("/getDetails", Middleware.isLoggedIn, function(req,res){
   res.sendFile("./views/getDetails.html" , {root: __dirname + "/.." }); 
});

router.post("/getDetails", Middleware.isLoggedIn , function(req,res){
    var ModfiedDetails = req.body;
    var itelist = new Array();
    Object.keys(ModfiedDetails.equipments).forEach(function(key) {
        itelist.push({name:ModfiedDetails.equipments[key]});
    });
    ModfiedDetails.equipments = itelist;
    //console.log(ModfiedDetails);
    UserDetails.findOneAndUpdate({email:req.user.email} ,ModfiedDetails ,function(err , userdetails){
        if(err){
            res.redirect("/login");
        }
        //console.log(userdetails);
        if(!userdetails){
            let ModfiedDetails = req.body.person;
            ModfiedDetails.email = req.user.email;
            UserDetails.create(ModfiedDetails, function(err,userdetails){
                if(err){
                    console.log(err);
                    res.redirect("/sample");
                }
                else{
                    console.log("creating new userdetails");
                    User.findOne({email:req.user.email},function(err,user){
                        if(err){
                            res.redirect("/sample");
                        }else{
                            user.userDetails = userdetails;
                            user.save();
                            res.redirect("/");
                        }
                    });
                }
            });

        }
        else{
            res.redirect("/");
        }
        
    }); 
});


module.exports = router;