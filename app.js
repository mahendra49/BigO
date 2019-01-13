const express    = require("express"),
      app        = express(),
      bodyparser = require("body-parser"),
      passport   = require("passport"),
      Localstartegy = require("passport-local"),
      passportlocalmongoose = require("passport-local-mongoose"),
      User                  = require("./models/users"),
      mongoose 				= require("mongoose"), 
      Index = require("./routes/index");

mongoose.connect("mongodb://localhost/BigO",{useNewUrlParser:true});


//serve static file and form data retrieve 
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


//sessions
app.use(require("express-session")({
    secret:"holla bolla dolla",
    resave:false,
    saveUninitialized:false
}));

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

//passport authentication setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Localstartegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//redirecting the routes
app.use("/",Index);


app.listen(5000,function(){
	console.log("server running " + this.address().port);
});

