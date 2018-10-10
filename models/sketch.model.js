let mongoose = require('mongoose');

let sketchSchema = new mongoose.Schema({
    title: String
});

module.exports = { sketchSchema };

// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);