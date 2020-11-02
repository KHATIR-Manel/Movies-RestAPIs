const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({ //with schemaType
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Genre = mongoose.model('Genre', genreSchema);

// Genere validation
const genreValidation = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    return schema.validate({ name: genre.name });
}
module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre ;
module.exports.validate = genreValidation;