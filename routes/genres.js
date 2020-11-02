const express = require('express');
const { Genre, validate } = require('../models/genre');
const router = express.Router();
//Get 
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');

    res.send(genres);
    console.log("Success !");
});
//Get 
//look up at the genre
//If not existing, return 404 - Not found
//Else return the genre
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genere with the given Id was not found');

    res.send(genre);
    console.log("The genre " + genre.name);
});

//Post 
//Validate the genre
//If invalide, return 400 - Bad request 
//Else return the new genre
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);
    console.log("The genre was posted successfully");

});

//Update
//look up at the genre
//If not existing, return 404 - Not found
//Validate the genre
//If invalide, return 400 - Bad request 
//Else update the genre 
//Return the updated genre
router.put('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('The genere with the given Id was not found');

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.send(genre);
    console.log("The genre was updated successfully");
});

//Delete 
//look up at the genre
//If not existing, return 404 - Not found
//Else delete the genre 
//Return the deleted genre
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('The genere with the given Id was not found');

    res.send(genre);
    console.log("The genre was deleted successfully");
});

module.exports = router;