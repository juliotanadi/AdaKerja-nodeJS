const express = require("express");
const router = express.Router();
const webhookRoute = require("./webhookRoute");

router.use("/webhook", webhookRoute);

module.exports = router;
