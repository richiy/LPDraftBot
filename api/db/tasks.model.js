var mongoose = require("mongoose");
var taskSchema = new mongoose.Schema({
  task: Number,
  title: String,
  publisher: {
    name: String,
    url: String
  },
  published: Boolean
});

mongoose.model("taskModel", taskSchema, "taskcollection");
//mongoose.model(name of model, schema, collection name)
