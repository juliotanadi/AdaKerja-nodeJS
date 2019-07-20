const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.webhook.verifyFacebook);
router.post("/", controller.webhook.handleMessage);

module.exports = router;
