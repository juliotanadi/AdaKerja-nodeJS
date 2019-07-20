const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.webhook.verifyFacebook);

module.exports = router;
