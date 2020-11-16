const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivatekey")) {
    throw new Error("jwtPrivatekey is not definde !"); //for track trace 
  }
};
