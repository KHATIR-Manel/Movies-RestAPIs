require("express-async-errors"); //Handeling async errors in express routes handlers
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  // process.on("unhandledRejection", (ex) => {
  //   console.log(ex);
  //   throw ex;
  // });

  winston.configure({
    transports: [
      new winston.transports.Console({
        //To log the error in the console
        level: "error",
        colorize: true,
        prettyPrint: true,
      }),
      new winston.transports.File({
        handleExceptions: true,
        handleRejections: true,
        filename: "logFile.log",
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
