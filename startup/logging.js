const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {

// process.on('uncaughtException', (ex) => {
//   console.log(ex);
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// process.on('unhandledRejection', (ex) => {
//   console.log(ex);
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

winston.handleExceptions(
    new winston.transports.File({filename:'uncaughtException.log',handleExceptions: true})
  );
  
  process.on('unhandledRejection', (ex) => {
  console.log(ex);
  throw ex;
  });
  
  winston.configure({
    transports: [
      new winston.transports.File({ filename: 'logFile.log', handleExceptions: true })
    ]
  });
  
  winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost/vidly", level: "error" }));
}