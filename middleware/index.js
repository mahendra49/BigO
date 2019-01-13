const middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

middlewareObj.isLogged =function isLogged(req,res,next){
    
    if(!req.isAuthenticated()){
       return next();
    } 

    res.redirect("/user");
}

module.exports = middlewareObj;