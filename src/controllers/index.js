const webhookController = require("./webhookController");
const messageController = require("./messageController");

module.exports = {
  webhook: webhookController,
  message: messageController
};
