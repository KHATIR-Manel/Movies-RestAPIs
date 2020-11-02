const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        requierd: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 10
    }
}));

//Joi Validation
const customerValidation = (customer) => {
    const shema = Joi.object({
        name: Joi.string().min(4).required(), //requierd not requier ;)
        isGold: Joi.boolean(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
    });
    return shema.validate({
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone
    });
}

module.exports.Customer = Customer;
module.exports.validate = customerValidation;