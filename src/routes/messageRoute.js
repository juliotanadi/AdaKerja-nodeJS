const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.message.getAllMessage);
router.get("/:id", controller.message.getMessageById);
router.delete("/:id", controller.message.deleteMessageById);

module.exports = router;
