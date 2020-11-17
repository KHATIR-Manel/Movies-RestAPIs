require("express-async-errors"); //Handeling async errors in express routes handlers
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  process.on("unhandledRejection", (ex) => {
    console.log(ex);
    throw ex;
  });

  winston.configure({
    transports: [
      new winston.transports.File({
        filename: "logFile.log",
        handleExceptions: true,
      }),
    ],
  });

  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "error",
    })
  );
};
