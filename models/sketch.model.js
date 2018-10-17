const mongoose = require('mongoose');

const sketchSchema = mongoose.Schema({
    img: {
        data: Buffer
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        default: 'sketches'
    }

});

module.exports = sketchSchema;