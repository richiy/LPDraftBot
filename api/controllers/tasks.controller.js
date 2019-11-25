const mongoose = require("mongoose");
const Tasks = mongoose.model("taskModel");
//                  name of model ^
var request = require("request");
var cheerio = require("cheerio");

let pubCrawlers = {
  "South Florida Reporter": function(taskNum, title, publisherName) {
    console.log("crawling " + publisherName + " for " + title);
  }
};

//const path = require("../../server.js"); //requires the root path of your project
//--------------------------------------------------

module.exports.home = function(req, res) {
  //console.log(path.root);
  //res.render("index", miniDataBase);
  Tasks.find().exec(function(err, allTasks) {
    if (!err) {
      //res.status(500).json(err);
      console.log(allTasks);
      res.render("index", { tasks: allTasks });
    } else {
      console.log(err);
    }
  });
};

module.exports.purgeAllTasks = function(req, res) {
  Tasks.deleteMany({}, function() {
    Tasks.find().exec(function(err, allTasks) {
      if (!err) {
        //res.status(500).json(err);
        console.log(allTasks);
        res.render("index", { tasks: allTasks });
      } else {
        console.log(err);
      }
    });
  });
};
//--------------------------------------------------
module.exports.getUnpublishedTasks = function(req, res) {
  //mongodb find all users
  Tasks.find({ published: { $eq: false } }).exec(function(err, allTasks) {
    if (!err) {
      //res.status(500).json(err);
      console.log(allTasks);

      res.render("index", { tasks: allTasks });
    } else {
      console.log(err);
    }
  });
};
module.exports.getPublishedTasks = function(req, res) {
  //mongodb find all users
  Tasks.find({ published: { $eq: true } }).exec(function(err, allTasks) {
    if (!err) {
      //res.status(500).json(err);
      console.log(allTasks);

      res.render("index", { tasks: allTasks });
    } else {
      console.log(err);
    }
  });
};
module.exports.getAllTasks = function(req, res) {
  //mongodb find all users
  Tasks.find().exec(function(err, allTasks) {
    if (!err) {
      //res.status(500).json(err);
      console.log(allTasks);
      res.render("index", { tasks: allTasks });
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
      published: true
    },
    function(err, formData) {
      if (err) {
        res.status(400).json({ message: "creation error" });
      } else {
        Tasks.find().exec(function(err, allTasks) {
          if (!err) {
            //res.status(500).json(err);
            console.log(allTasks);
            res.render("index", { tasks: allTasks });
          } else {
            console.log(err);
          }
        });
      }
    }
  );
};
module.exports.crawl = function(req, res) {
  //interate all task that have published = false
  //query task with published = false
  Tasks.find({ published: { $eq: false } }).exec(function(err, allTasks) {
    if (!err) {
      //res.status(500).json(err);
      //console.log(allTasks);
      //let pubNames = {};
      for (var i = 0; i < allTasks.length; i++) {
        //console.log(allTasks[i].publisher.name);
        //run publisher crawl for each tasks
        //pubNames[i] = allTasks[i].publisher.name;
        if (pubCrawlers.hasOwnProperty(allTasks[i].publisher.name)) {
          pubCrawlers[allTasks[i].publisher.name](
            allTasks[i].task,
            allTasks[i].title,
            allTasks[i].publisher.name
          );
        }
      }

      res.json({ hey: "duda" });
    } else {
      console.log(err);
    }
  });
};
module.exports.testCrawl = function(req, res) {
  createCalabasasApparelCrawler(
    "blog test 2",
    "https://calabasasapparel.net/blogs/news",
    1121,
    function() {
      res.json({ dudaTest: "hey duda" });
    }
  );
};
function createCalabasasApparelCrawler(title, url, taskNum, callback) {
  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      let blogArray = $(".article__title a");
      //console.log(blogArray);
      for (var i = 0; i < blogArray.length; i++) {
        console.log(blogArray[i].attribs.href);
      }
      // if (blogTitleResponse == title) {
      //   console.log(taskNum + " published");
      //   return callback(blogTitleResponse == title);
      // } else {
      //   console.log(taskNum + " not published");
      //   return callback(blogTitleResponse == title);
      // }
    }
  });
}
// function createCalabasasApparelCrawler(title, url, taskNum, callback) {
//   request(url, function(error, response, html) {
//     if (!error) {
//       var $ = cheerio.load(html);
//       let blogArray = $(".blog-list-view");
//       let blogTitleResponse =
//         blogArray[0].children[1].children[1].children[1].children[1].children[1]
//           .children[1].children[0].children[0].data;
//       console.log(blogTitleResponse);
//       if (blogTitleResponse == title) {
//         console.log(taskNum + " published");
//         return callback(blogTitleResponse == title);
//       } else {
//         console.log(taskNum + " not published");
//         return callback(blogTitleResponse == title);
//       }
//     }
//   });
// }
// function createCalabasasApparelCrawler(title, url, taskNum) {
//   let blogTitle = title;
//   let blogTaskNum = taskNum;
//   let published = false;
//   let mainBlogPageURL = url;
//   function crawler() {
//     request(mainBlogPageURL, function(error, response, html) {
//       if (!error) {
//         var $ = cheerio.load(html);
//         let blogArray = $(".blog-list-view");
//         let blogTitleResponse =
//           blogArray[0].children[1].children[1].children[1].children[1]
//             .children[1].children[1].children[0].children[0].data;
//         console.log(blogTitleResponse);
//         if (blogTitleResponse == blogTitle) {
//           console.log(blogTaskNum + " published");
//           return true;
//         } else {
//           console.log(blogTaskNum + " not published");
//           return false;
//         }
//       }
//     });
//   }
//
//   return crawler;
// }
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
