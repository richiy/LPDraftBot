//npm install to get modules
require("./api/db/db.js");
var routes = require("./api/routes/routes.js");
var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static("views"));

// create application/json parser
//var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));

// POST /login gets urlencoded bodies
app.set("view engine", "ejs");
/*-------------routes middleware-------------------------*/
//looks into any routes in routes.js,
//looks for any routes starting with /
//we can also force it to look at /api only
app.use("/", routes);
/*-------------------------------------------------------*/

console.log("running on 8080");

app.listen("8080");

exports = module.exports = app;
