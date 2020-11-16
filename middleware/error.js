const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  //To log the error
  const transport = new winston.transports.Console();
  const logger = winston.createLogger({
  transports: [transport],
  });
  logger.error(err.message, err);
  res.status(500).send("Something failed");
};
