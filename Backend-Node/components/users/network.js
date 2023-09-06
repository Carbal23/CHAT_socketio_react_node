const express = require("express");
const controller = require("./controller");
const router = express.Router();
const response = require("../../network/response");

router.post("/", function (req, res) {
  controller
    .addUser(req.body.name)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((e) => {
      response.error(req, res, "hubo un error", e);
    });
});

router.get("/", function (req, res) {
  controller
    .listUser()
    .then((users) => {
      response.success(req, res, users, 200);
    })
    .catch((e) => {
      response.error(req, res, "hubo un error", 500, e);
    });
});
module.exports = router;
