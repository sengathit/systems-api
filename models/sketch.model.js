const mongoose = require('mongoose');

const sketchSchema = mongoose.Schema({
    img: {
        type: String,
        default: 'someImage'
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

module.exports = mongoose.model('Doodles',sketchSchema);

// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);