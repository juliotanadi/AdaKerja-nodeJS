const express = require("express");
const router = express.Router();
const messageRoute = require("./messageRoute");
const webhookRoute = require("./webhookRoute");

router.use("/messages", messageRoute);
router.use("/webhook", webhookRoute);

module.exports = router;
