const port = 4321;
const host = "localhost"; //optional
var bodyParser, express, mongoose, app;
bodyParser = require("body-parser");
express = require("express");
mongoose = require("mongoose");
app = express();

mongoose.connect("mongodb://localhost/restful_blog")
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

/*The blog has:
title
body
image
date*/
app.get("/", function (req, res) {
    res.send("Hello World!")
});


app.listen(port, host, function () {
    console.log("RESTful blog started!")
})


