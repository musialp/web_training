var bodyParser          = require("body-parser");
var express             = require("express");
var expressSanitizer    = require("express-sanitizer")
var methodOverride      = require("method-override");
var mongoose            = require("mongoose");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blog");

var blogPostSchema = new mongoose.Schema({
    title:      String,
    image:      String,
    body:       String,
    created:    { type: Date, default: Date.now }
});

var BlogPost = mongoose.model("BlogPost", blogPostSchema);

// BlogPost.create({
//     title: "Test Blog Post",
//     image: "https://images.unsplash.com/photo-1494249465471-5655b7878482?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=191559dc1cae3f8967d568dfd8a77093&auto=format&fit=crop&w=1350&q=80",
//     body: "Hi. this is a blog post."
// });

app.get("/", function(req, res) {
    res.redirect("/blog");
});

app.get("/blog", function(req, res) {
    BlogPost.find({}, function(err, allBlogPosts) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogPosts: allBlogPosts});
        }
    })
});

app.get("/blog/new", function(req, res) {
    res.render("new");
});

app.post("/blog", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    BlogPost.create(req.body.blogPost, function(err, newBlogPost) {
        if(err) {
            console.log(err);
            res.render("new");
        } else {
            res.redirect("/blog");
        }
    })
})

app.get("/blog/:id", function(req, res) {
    BlogPost.findById(req.params.id, function(err, foundBlogPost) {
        if(err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("show", {blogPost: foundBlogPost})
        }
    })
})

app.get("/blog/:id/edit", function(req, res) {
    BlogPost.findById(req.params.id, function(err, foundBlogPost) {
        if(err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("edit", {blogPost: foundBlogPost})
        }
    })
})

app.put("/blog/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    BlogPost.findByIdAndUpdate(req.params.id, req.body.blogPost, function(err, updatedBlogPost) {
        if(err) {
            res.redirect("/");
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    } )
})

app.delete("/blog/:id", function(req, res) {
    BlogPost.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    })
})

app.listen(3000, function() {
    console.log("Server is running");
})