const port = 4321;
const host = "localhost"; //optional
var bodyParser, express, mongoose, app;
bodyParser = require("body-parser");
express = require("express");
mongoose = require("mongoose");
app = express();

//APp Config
mongoose.connect("mongodb://localhost/restful_blog")
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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

app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (!err) {
            res.render("index", {blogs: blogs});
        }
        else console.log(err);
    });
});

app.listen(port, host, function () {
    console.log("RESTful blog started!");
});

