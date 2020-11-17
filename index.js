const winston = require("winston");
const express = require("express");
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


//Port
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Lesting to port " + port + "...");
  //winston.info("Lesting to port " + port + "...");
});

//  const p = Promise.reject(new Error('Something faild'));
//  p.then(() => console.log('Done'));

// throw new Error('Something faild during startup');