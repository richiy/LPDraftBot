const mongoose = require("mongoose");
const Tasks = mongoose.model("taskModel");
//                  name of model ^
var request = require("request");
var cheerio = require("cheerio");

//const path = require("../../server.js"); //requires the root path of your project
//--------------------------------------------------
let miniDataBase = {
  task: "1059",
  title: "how to bink a site",
  publisher: "South Florida Reporter",
  status: "not published"
};
module.exports.home = function(req, res) {
  //console.log(path.root);
  res.render("index", miniDataBase);
};
//--------------------------------------------------
module.exports.getAllTasks = function(req, res) {
  //mongodb find all users
  Tasks.find().exec(function(err, allTasks) {
    if (!err) {
      //res.status(500).json(err);
      console.log(allTasks);
      res.render("index", miniDataBase);
    } else {
      console.log(err);
    }
  });
};
//--------------------------------------------------

module.exports.addTask = function(req, res) {
  //add one user account
  console.log(req.body);
  let publisherInfo = req.body.publisher.split(",");
  let publisherName = publisherInfo[0];
  let publisherUrl = publisherInfo[1];
  //console.log(publisherName);
  //console.log(publisherUrl);

  Tasks.create(
    {
      task: req.body.task,
      title: req.body.title,
      publisher: { name: publisherName, url: publisherUrl },
      published: false
    },
    function(err, formData) {
      if (err) {
        res.status(400).json({ message: "creation error" });
      } else {
        res.status(201).json(formData);
      }
    }
  );
  res.render("index", miniDataBase);
};
module.exports.crawl = function(req, res) {
  createCalabasasApparelCrawler(
    "blog test 2",
    "https://calabasasapparel.net/blogs/news",
    1059
  )();
  res.render("index", miniDataBase);
};
function createCalabasasApparelCrawler(title, url, taskNum) {
  let blogTitle = title;
  let blogTaskNum = taskNum;
  let published = false;
  let mainBlogPageURL = url;
  function crawler() {
    const intervalObj = setInterval(() => {
      request(mainBlogPageURL, function(error, response, html) {
        if (!error) {
          var $ = cheerio.load(html);
          let blogArray = $(".blog-list-view");
          let blogTitleResponse =
            blogArray[0].children[1].children[1].children[1].children[1]
              .children[1].children[1].children[0].children[0].data;
          console.log(blogTitleResponse);
          if (blogTitleResponse == blogTitle) {
            clearInterval(intervalObj);
            console.log("ending");
            console.log(blogTaskNum + " published");
            return blogTitleResponse;
          } else {
            console.log(blogTaskNum + " not published");
          }
        }
      });
    }, 1000);
    return blogTaskNum;
  }

  return crawler;
}
//--------------------------------------------------

// module.exports.usersGetOne = function(req, res) {
//   //var userId = req.params.userId;
//
//   var userId = "59cef4137d0797984c30b8c6"; //forced
//
//   //finds one user account
//   Users.findById(userId).exec(function(err, user) {
//     if (err) {
//       res.status(500).json(err);
//     } else if (!user) {
//       res.status(404).json({ message: "user not found!" });
//     } else {
//       res.json(user);
//     }
//   });
// };
//--------------------------------------------------

//--------------------------------------------------
