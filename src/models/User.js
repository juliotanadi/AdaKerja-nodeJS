const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  birth_date: {
    type: Date
  }
});

try {
  module.exports = mongoose.model("User", userSchema);
} catch (e) {
  module.exports = mongoose.model("User");
}
