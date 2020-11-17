const winston = require("winston");
const mongoose = require("mongoose");

//Connect to the database
module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly", {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    })
    .then(() => winston.info("Connect to Vidly..."));
};
