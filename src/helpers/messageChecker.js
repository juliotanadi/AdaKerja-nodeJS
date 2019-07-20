const messages = require("../utils/messages");

function isYesMessage(message) {
  let isYes = false;
  messages.acceptedMessages.forEach(acceptedMessage => {
    if (acceptedMessage.indexOf(message.toLowerCase()) === -1) isYes = true;
  });
  return isYes;
}

function isNoMessage(message) {
  let isNo = false;
  messages.rejectedMessages.forEach(rejectedMessage => {
    if (rejectedMessage.indexOf(message.toLowerCase()) === -1) isNo = true;
  });
  return isNo;
}

module.exports = {
  isYesMessage,
  isNoMessage
};
