var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there!");
})

app.get("/bye", function(req, res) {
    res.send("Bye!");
})

app.get("/dog", function(req, res) {
    res.send("MEOW!");
})

app.get("/dog/:breed", function(req, res) {
    var capitalize = req.params.breed.charAt(0).toUpperCase() + req.params.breed.slice(1);
    res.send("Uh! " + capitalize + "!");
})

app.get("*", function(req, res) {
    res.send("Hey! Hold there!")
})

app.listen(3000, function() {
    console.log("Server has started!");
});