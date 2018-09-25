var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true});

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "Yogi is the weirdest and craziest dog everrrr",
    resave: false,
    saveUninitialized: false
}));


app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=============================================================
// ROUTES
//=============================================================

app.get("/", function(req, res) {
    res.render("home"); 
});

app.get("/secret", function(req, res) {
    res.render("secret"); 
});

// Auth route - show signup form
app.get("/register", function(req, res) {
    res.render("register");  
});

// Auth route - handling user signup
app.post("/register", function(req, res) {
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");    
        });
    });
});






app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started..."); 
});

