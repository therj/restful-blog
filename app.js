const port = 4321;
const host = "localhost"; //optional
var bodyParser = require("body-parser");
var express = require("express");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var app = express();

//App Config
mongoose.connect("mongodb://localhost/restful_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//Mongoose Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

/*
TEST
Blog.create({
    title: "Test blog",
    image: "https://images.unsplash.com/photo-1429593886847-3cc52983f919?auto=format&fit=crop&w=1389&q=80",
    body: "Hello! New Post!"
});
*/

/*The blog has:
title
body
image
date*/

//RESTful Routes
app.get("/", function (req, res) {
    res.redirect("/blogs");
});

//Index Route
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (!err) {
            res.render("index", {blogs: blogs});
        }
        else console.log(err);
    });
});

//New Route
app.get("/blogs/new", function (req, res) {
    res.render("new")
});

//Create Route
app.post("/blogs", function (req, res) {
    Blog.create(req.body.blog, function (err, newBlog) {
        if (!err) {
            res.redirect("/blogs");
        }
        else res.render("new");
    });

});

//Show Route
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (!err) {
            res.render("show", {blog: foundBlog});
        }
        else {
            res.redirect("/blogs");
        }
    });
});

//Edit Route
app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (!err) {
            res.render("edit", {blog: foundBlog});

        }
        else {
            res.redirect("/blog")
        }
    });
});

//Update route
app.put("/blogs/:id", function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (!err) {
            res.redirect("/blogs/" + req.params.id) //id also in updatedBlog.id
        }
        else {
            res.redirect("/blogs");
        }
    });
});

//Delete Route
app.delete("/blogs/:id", function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (!err) {
            res.redirect("/blogs")
        }
        else {
            console.log(err);
            res.redirect("/blogs");
        }
    });
});


app.listen(port, host, function () {
    console.log("RESTful blog started!");
});

