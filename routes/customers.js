const express = require('express');
const { Customer, validate } = require('../models/customer');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();


//Get 
router.get('/', auth , async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
    console.log("Success !");
});
//Get 
//look up at the customer
//If not existing, return 404 - Not found
//Else return the customer
router.get('/:id', auth, async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given Id was not found');

    res.send(customer);
    console.log("The customer " + customer.name);
});

//Post 
//Validate the customer
//If invalide, return 400 - Bad request 
//Else return the new customer
router.post('/',  [auth, admin] , async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    await customer.save();
    res.send(customer);
    console.log("The customer was posted successfully");
});
//Update
//look up at the customer
//If not existing, return 404 - Not found
//Validate the customer
//If invalide, return 400 - Bad request 
//Else update the customer 
//Return the updated customer
router.put('/:id', [auth, admin] ,async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, { new: true });
    if (!customer) return res.status(404).send("The customer with the given Id was not found");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.send(customer);
    console.log("The customer was updated successfully");
});
//Delete
//look up at the customer
//If not existing, return 404 - Not found
//Else delete the customer 
//Return the deleted customer
router.delete('/:id',  [auth, admin] , async (req, res) => {
    const customer = await Customer.findOneAndDelete(req.params.id);
    if (!customer) return res.status(404).send("The customer with the given Id was not found")

    res.send(customer);
    console.log("The genre was deleted successfully");
});

module.exports = router;