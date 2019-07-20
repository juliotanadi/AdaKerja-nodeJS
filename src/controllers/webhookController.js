function verifyFacebook(req, res) {
  return res.send(req.query["hub.challenge"]);
}

module.exports = {
  verifyFacebook
};
