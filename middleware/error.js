const winston = require("winston");
//Handling errors in request processing pipeline
module.exports = function (err, req, res, next) {
  winston.error(err.message, err);

  res.status(500).send("Something failed");
};
