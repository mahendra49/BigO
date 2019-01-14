
const   express             = require("express"),
        router              = express.Router(),
        passport            = require("passport"),
        User                = require("../models/users"),
        Middleware          = require("../middleware/index"),
        UserDetails         = require("../models/userDetails"); 


router.get("/signup",function(req,res){
    res.sendFile("./views/registration.html" , {root: __dirname + "/.." });
});

router.get("/login",Middleware.isLogged ,function(req,res){
	res.sendFile("./views/login.html" , {root: __dirname + "/.." });
});

//for getting details of user right after registration or updation(any time after registraion)
router.get("/getDetails", Middleware.isLoggedIn, function(req,res){
   res.sendFile("./views/getDetails.html" , {root: __dirname + "/.." }); 
});

router.post("/getDetails", Middleware.isLoggedIn , function(req,res){
    console.log("here");
    console.log(req.body.person);
    console.log(req.user);
    UserDetails.findOne({email:req.user.email} , function(err , userdetails){
        if(err){
            res.redirect("/login");
        }
        if(!userdetails){
            UserDetails.insert(req.body.person , function(err,userdetails){
                if(err){
                    res.redirect("/sammple");
                }
                else{
                    User.findOne({email:req.user.email},function(err,user){
                        if(err){
                            res.redirect("/sample");
                        }else{
                            user.userDetails = userdetails;
                            res.redirect("/");
                        }
                    });
                }
            });

        }
        else{
            userdetails = req.body.person;
            userdetails.save(function(err , userdetails ){
                if(err){
                    console.log("err in getDetails/post---userdetails.save");
                    res.redirect("/sammple");
                }
            });
            User.findOne({email:req.user.email} , function(err,user){
                user.userDetails = userdetails
                user.save(function(err,user){
                    if(err){
                        console.log("user.find in getDetails");
                        res.redirect("/sample");
                    }
                    else{
                        res.redirect("/");
                    }
                });

            });
        }
    }); 
});

//check if user is logged in (logges in and signup up at the same time is not possible)
router.post("/signup", Middleware.isLogged, function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;
    
    User.register({
        username:username,
        email:email
    },password,function(err,user){
        if(err){
            res.redirect("/signup");
        }
        else{
            	passport.authenticate("local")(req,res,function(){
                res.redirect("/getDetails");
            });
        }
    });
    
});


//auth and login in 
router.post("/login",passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login"
    }),function(req,res){
});

//logout session 
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/login");
});

module.exports = router; 