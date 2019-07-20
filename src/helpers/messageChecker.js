const messages = require("../utils/messages");

function isYesMessage(message) {
  return messages.acceptedMessages.some(acceptedMessage => {
    return acceptedMessage.indexOf(message) !== -1;
  });
}

function isNoMessage(message) {
  return messages.rejectedMessages.some(rejectedMessage => {
    return rejectedMessage.indexOf(message) !== -1;
  });
}

module.exports = {
  isYesMessage,
  isNoMessage
};
