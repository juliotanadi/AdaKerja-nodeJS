const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.message.getAllMessage);

module.exports = router;
