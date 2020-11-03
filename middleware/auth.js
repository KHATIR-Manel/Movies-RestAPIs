const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  // 401 Unauthorized
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const payload = jwt.verify(token, config.get("jwtPrivatekey"));
    req.user = payload;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}

