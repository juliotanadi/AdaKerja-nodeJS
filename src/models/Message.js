const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

try {
  module.exports = mongoose.model("Message", messageSchema);
} catch (e) {
  module.exports = mongoose.model("Message");
}
