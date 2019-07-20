const Message = require("../models/Message");

async function getAllMessage(req, res) {
  const messages = await Message.find({});

  return res.send({
    messages
  });
}

module.exports = {
  getAllMessage
};
