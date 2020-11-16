//Handeling async errors in express routes handlers
require('express-async-errors');
const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
require('./startup/db')();
const app = express();
require('./startup/routes')(app);


//const p = Promise.reject(new Error('Something faild'));
// p.then(() => console.log('Done'));

//throw new Error('Something faild during startup');

if (!config.get("jwtPrivatekey")) {
  console.error("jwtPrivatekey is not definde !");
  process.exit(1);
}

//Port
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Lesting to port " + port + "...");
});
