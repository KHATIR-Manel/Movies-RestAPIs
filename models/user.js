const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

//User object have fct call generateAuthToken
userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({_id:this._id}, config.get('jwtPrivatekey'));
    return token;
}

const User = mongoose.model('User', userSchema);

const uservalidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:Joi.string().min(5).max(255).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schema.validate({
        name: user.name,
        email: user.email,
        password: user.password
    });
}

module.exports.User = User;
module.exports.validate = uservalidation;