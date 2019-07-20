require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");
const router = require("./src/routes");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(
  `mongodb://${process.env.DATABASE_USER_NAME}:${
    process.env.DATABASE_PASSWORD
  }@${process.env.DATABASE_SERVER}:${process.env.DATABASE_PORT}/${
    process.env.DATABASE_NAME
  }`,
  { useNewUrlParser: true }
);

const app = express().use(bodyParser.json());

const uri =
  process.env.PROFILE_URI + "?access_token=" + process.env.PAGE_ACCESS_TOKEN;

const options = {
  uri,
  method: "POST",
  headers: { "Content-Type": "application/json" },
  form: {
    greeting: [
      {
        locale: "default",
        text: `Welcome to AdaKerja\nNice to see you`
      }
    ],
    get_started: {
      payload: `{"template_type": "generic", "elements": [ {"buttons": [ {"type":"postback", "title":"Get your job", "payload": "Hello AdaKerja"} ] } ] }'`
    }
  }
};

app.use("/", router);

const PORT = process.env.PORT || 4798;

app.listen(PORT, () => {
  request(options);
  console.log(`App listening on port ${PORT}`);
});
