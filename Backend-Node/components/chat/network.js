const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.post("/", (req, res) => {
  controller
    .addChat(req.body.users)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((e) => {
      response.error(req, res, "hubo un error", 500, e);
    });
});

router.get("/:userId", (req, res) => {
  controller
    .listChats(req.params.userId)
    .then((users) => {
      response.success(req, res, users, 200);
    })
    .catch((e) => {
      response.success(req, res, "hubo un error", 500, e);
    });
});

module.exports = router;
