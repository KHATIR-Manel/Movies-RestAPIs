const express = require('express');
const { User, validate } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

//Get 
router.get('/', async (req, res) => {
    const user = await User.find().sort('name');
    res.send(user);
    console.log("Success !");
});
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('The user with the given Id was not found');

    res.send(user);
    console.log("The user " + user.name);
});
//Post 
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User alreday registered');

    user = new User(_.pick(req.body, ['name','email','password']));

    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));
    console.log("The user was registered successfully");
});

module.exports = router;