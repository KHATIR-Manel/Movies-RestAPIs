const express = require("express");
const mongoose = require("mongoose");
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
const error = require('./middleware/error');
const app = express();

require('express-async-errors');

if (!config.get("jwtPrivatekey")) {
  console.error("jwtPrivatekey is not definde !");
  process.exit(1);
}

//Connect to the database
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to Vidly"))
  .catch((err) => console.error("Could not connect to Vidly", err.message));

//Middleware
app.use(express.json());
app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);
//Port
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Lesting to port " + port + "...");
});
