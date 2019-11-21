// Using Node.js `require()`
const mongoose = require("mongoose");

// Using ES6 imports
// import mongoose from "mongoose";

mongoose.connect(
  "mongodb://localhost:27017/testdb",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("connected", function() {
  console.log("mongodb is connected");
});

//bring in schema and models
require("./tasks.model.js");
