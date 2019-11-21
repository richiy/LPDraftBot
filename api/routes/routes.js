var express = require("express");
var tasks = require("../controllers/tasks.controller.js");

var router = express.Router();

router
  .route("/")
  .get(tasks.home)
  .post(tasks.addTask);
router.route("/api").get(tasks.getAllTasks);
router.route("/crawl").get(tasks.crawl);

// router
//   .route("/api/accounts/signUp")
//   .get(userAccounts.userSignUp)
//   .post(userAccounts.addUser);
// router.route("/api/accounts/usersGetAll").get(userAccounts.usersGetAll);
// router.route("/api/accounts/usersGetOne").get(userAccounts.usersGetOne);

module.exports = router;
