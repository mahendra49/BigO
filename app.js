const express    = require("express"),
      app        = express(),
      bodyparser = require("body-parser"),
      passport   = require("passport"),
      Localstartegy = require("passport-local"),
      passportlocalmongoose = require("passport-local-mongoose"),
      User                  = require("./models/users"),
      mongoose 				= require("mongoose"), 
      Index = require("./routes/index"),
      GoogleStrategy = require('./routes/googleAuth'),
      Middleware  = require("./middleware/index");


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

//google auth
passport.use(GoogleStrategy);


app.get("/" , function(req,res){
    res.send("all details saved");  
});

app.get("/sample", Middleware.isLoggedIn,function(req,res){
  res.send("ok all set");
});


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email']} ));


// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/sample',
        failureRedirect: '/signup'
}));



//redirecting the routes
app.use("/",Index);


app.listen(3000,function(){
	console.log("server running " + this.address().port);
});

