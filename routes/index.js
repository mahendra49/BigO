
const   express             = require("express"),
        router              = express.Router(),
        passport            = require("passport"),
        User                = require("../models/users"),
        Middleware          = require("../middleware/index");
       

router.get("/signup",function(req,res){
    res.sendFile("./views/registration.html" , {root: __dirname + "/.." });
});

router.get("/login",Middleware.isLogged ,function(req,res){
	res.sendFile("./views/login.html" , {root: __dirname + "/.." });
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
        successRedirect:"/getDetails",
        failureRedirect:"/login"
    }),function(req,res){
});

//logout session 
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/login");
});

module.exports = router; 