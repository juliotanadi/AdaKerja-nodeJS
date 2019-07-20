const request = require("request");
const moment = require("moment");
const Message = require("../models/Message");
const User = require("../models/User");
const messageChecker = require("../helpers/messageChecker");

function verifyFacebook(req, res) {
  if (req.query["hub.verify_token"] !== process.env.PAGE_ACCESS_TOKEN)
    return res.send({});
  return res.send(req.query["hub.challenge"]);
}

async function handleMessage(req, res) {
  if (req.body.object !== "page") return res.send({});

  const { entry } = req.body;

  entry.forEach(async e => {
    const messaging = e.messaging[0];

    const { id: senderId } = messaging.sender;
    const { id: recipientId } = messaging.recipient;

    if (senderId === process.env.BOT_ID) return res.send({});

    //message delivered event
    if ("delivery" in messaging) return res.send({});

    //message read event
    if ("read" in messaging) return res.send({});

    //postback event
    if ("postback" in messaging) {
      const user = await User.findOne({ id: senderId });

      if (!user || !user.name) {
        if (!user) {
          const newUser = await User.create({
            id: senderId
          });

          if (!newUser)
            return res.send({
              error: `Error while creating user`
            });
        }

        await sendReplyMessage(senderId, `Hello, may I know your name?`);

        return res.send({});
      }

      if (!user.birth_date) {
        await sendReplyMessage(senderId, `May I know your birth date?`);

        return res.send({});
      }

      await sendReplyMessage(
        senderId,
        `Welcome back ${
          user.name
        }. Do you want to know how many days until your next birthday?`
      );

      return res.send({});
    }

    const user = await User.findOne({ id: senderId });

    const { text: chatMessage } = messaging.message;

    await Message.create({
      user,
      message: chatMessage
    });

    if (!user.name) {
      const updatedUser = await User.findOneAndUpdate(
        {
          id: senderId
        },
        {
          name: chatMessage
        },
        { new: true }
      );

      await sendReplyMessage(
        senderId,
        `Hello ${updatedUser.name}, may I know your date of birth?`
      );

      return res.send({});
    } else if (!user.birth_date) {
      const updatedUser = await User.findOneAndUpdate(
        {
          id: senderId
        },
        {
          birth_date: chatMessage
        },
        { new: true }
      );

      await sendReplyMessage(
        senderId,
        `Thank you ${
          updatedUser.name
        }. Do you want to know how many days until your next birthday?`
      );

      return res.send({});
    }

    if (messageChecker.isYesMessage(chatMessage)) {
      const birthDateSplited = moment(user.birth_date)
        .format("YYYY-MM-DD")
        .split("-");

      const month = birthDateSplited[1];
      const day = birthDateSplited[2];

      let year = Number.parseInt(moment(Date.now()).format("YYYY"));

      if (moment(Date.now()) > moment(`${year}-${month}-${day}`)) {
        year += 1;
      }

      const dayDifference = Math.abs(
        Math.ceil(
          moment
            .duration(
              moment(`${year}-${month}-${day}`).diff(moment(Date.now()))
            )
            .asDays()
        )
      );

      await sendReplyMessage(
        senderId,
        `There are ${dayDifference} days left until your next birthday`
      );

      return res.send({});
    } else if (messageChecker.isNoMessage(chatMessage)) {
      await sendReplyMessage(senderId, `Goodbye`);

      return res.send({});
    }

    return res.send();
  });
}

async function sendReplyMessage(id, message) {
  const uri =
    process.env.REQUEST_URI + "?access_token=" + process.env.PAGE_ACCESS_TOKEN;
  const options = {
    uri,
    method: "POST",
    json: {
      messaging_type: "RESPONSE",
      recipient: {
        id
      },
      message: {
        text: message
      }
    }
  };

  return await request(options);
}

module.exports = {
  verifyFacebook,
  handleMessage
};
