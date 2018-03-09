var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin"];

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req, res){
    friends.push(req.body.name);
    res.redirect("/friends");
}) 

app.get("/dogs", function(req, res) {
    res.render("dogs");
});

app.get("/fallinlovewith/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [ 
        {title: "Post 1", author: "Susy"},
        {title: "Post 2", author: "Susy"}
    ];
    res.render("posts", {posts: posts})
});


app.listen(3000, function() {
    console.log("Server is running!");
});