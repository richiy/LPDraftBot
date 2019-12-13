var express = require("express");
var tasks = require("../controllers/tasks.controller.js");

var router = express.Router();

router
  .route("/")
  .get(tasks.home)
  .post(tasks.addTask);
router.route("/api").get(tasks.getAllTasks);
router.route("/unpublished-tasks").get(tasks.getUnpublishedTasks);
router.route("/published-tasks").get(tasks.getPublishedTasks);
router.route("/crawl").get(tasks.crawl);
router.route("/purgeAllTasks").get(tasks.purgeAllTasks);
// router.route("/testCrawl").get(tasks.testCrawl);
router.route("/updateByTaskNum").get(tasks.updateByTaskNum);
router.route("/deepCrawl").get(tasks.deepCrawl);


// router
//   .route("/api/accounts/signUp")
//   .get(userAccounts.userSignUp)
//   .post(userAccounts.addUser);
// router.route("/api/accounts/usersGetAll").get(userAccounts.usersGetAll);
// router.route("/api/accounts/usersGetOne").get(userAccounts.usersGetOne);

module.exports = router;
