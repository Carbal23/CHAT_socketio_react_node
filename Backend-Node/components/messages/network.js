const express = require("express");
const multer = require("multer");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");
const config = require("../../config");

const upload = multer({
  dest: `public/${config.filesRoute}/`
})

router.get("/", (req, res) => {
  const filterMessages = req.query.chat || null;
  controller
    .getMessages(filterMessages)
    .then((messagesList) => {
      response.success(req, res, messagesList, 200);
    })
    .catch((e) => {
      response.error(req, res, "ha ocurrido un error inesperado", 500, e);
    }); 
});

router.post("/", upload.single("file"), function (req, res) {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.msg, req.file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((e) => {
      response.error(
        req,
        res,
        "Informacion invalida",
        400,
        e
      );
    });
});

router.patch("/:id", function (req, res) {
  controller
    .updateMessage(req.params.id, req.body.msg)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((e) => {
      response.error(req, res, "Hubo un error", 500, e);
    });
});

router.delete("/:id", function (req, res) {
  controller
    .deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
    })
    .catch((e) => {
      response.error(req, res, "Hubo un error", 500, e);
    });
});

module.exports = router;
