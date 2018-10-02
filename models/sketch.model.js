const mongoose = require('mongoose');

const sketchSchema = new mongoose.Schema({
    img: '',
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        default: 'sketches'
    },
    date: Number

});

module.exports = { sketchSchema };

// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);