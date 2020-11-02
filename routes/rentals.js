const express = require('express');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const Transaction = require('mongoose-transactions');

const router = express.Router();
const transaction = new Transaction();

//Get 
router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut');

    res.send(rental);
    console.log("Success !");
});
//Post 
router.post('/', async (req, res) => {
    const { error } = await validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalide customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalide movie');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    try {
        transaction.insert('Rental', rental);
        transaction.update('Movie', movie._id, { $inc: { numberInStock: -1 } });
        await transaction.run();

        res.send(rental);
        console.log("The rental was posted successfully");
    } catch (error) {
        console.error(error);
        await transaction.rollback().catch(console.error);
        transaction.clean();
        res.status(500).send('Something failed');
    }

});
//Update
router.put('/:id', async (req, res) => {
    const { error } = await validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalide customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalide movie ');

    const rental = await Rental.findByIdAndUpdate(req.params.id, {
        customerId: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movieId: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    }, { new: true });

    if (!rental) return res.status(404).send('The rental with the given Id was not found');

    res.send(rental);
    console.log("The rental was updated successfully");
});
//Delete 
router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).send('The rental with the given Id was not found');

    res.send(rental);
    console.log("The rental was deleted successfully");
});

module.exports = router;