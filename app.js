require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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

app.use("/", router);

const PORT = process.env.PORT || 4798;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
