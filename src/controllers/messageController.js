const Message = require("../models/Message");

function getAllMessage(req, res) {
  Message.find({})
    .then(messages => {
      return res.send({
        messages
      });
    })
    .catch(error => {
      return res.status(500).send();
    });
}

function getMessageById(req, res) {
  const { id } = req.params;

  Message.findById(id)
    .then(message => {
      return res.send({
        message
      });
    })
    .catch(error => {
      return res.status(404).send();
    });
}

function deleteMessageById(req, res) {
  const { id } = req.params;

  Message.findByIdAndDelete(id)
    .then(message => {
      return res.send({
        message
      });
    })
    .catch(error => {
      return res.status(404).send();
    });
}

module.exports = {
  getAllMessage,
  getMessageById,
  deleteMessageById
};
