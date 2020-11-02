const express = require('express');
const mongoose = require('mongoose');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

//Connect to the database
mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connect to Vidly'))
    .catch((err) => console.error('Could not connect to Vidly', err.message));

//Middleware
app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
//Port 
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('Lesting to port ' + port + '...');
});
