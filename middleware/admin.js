
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
// 401 Unauthorized
// 401 Forbidden
if(!req.user.isAdmin) return res.status(401).send('Access denied !');
next();
}