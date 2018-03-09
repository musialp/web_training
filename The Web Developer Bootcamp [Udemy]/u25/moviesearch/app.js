var express = require("express");
var request = require("request");


var app = express();
app.set("view engine", "ejs")

app.get("/", function(req, res) {
    res.render("search");
})

app.get("/results", function(req, res) {
    console.log(req.query.search);
    var searchTerm = req.query.search;
    var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + searchTerm;
    request(url, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            res.render("results", { movieData: movieData });
        }
    });
});

app.listen(3000, function() {
    console.log("Server is running!");
})