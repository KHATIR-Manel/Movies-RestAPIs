const express = require('express');
const Joi = require('joi');
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);

    console.log("Successful login !");
});

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(5).max(255).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schema.validate({
        email: user.email,
        password: user.password
    });
}

module.exports = router;