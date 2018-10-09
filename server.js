const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const sketchSchema = require('./models/sketch.model');
const dbURL = 'mongodb://sengathit:Slavanh77@ds117423.mlab.com:17423/sketch';

mongoose.connect(dbURL,{ useNewUrlParser: true });

const port = process.env.PORT || 3000;
let doodles = mongoose.model('Doodles', sketchSchema,'doodles');

app.use(cors());

app.get('/',(req, res) => {
    res.send('Hello world');
});

app.get('/api/photos',(req,res) => {
    doodles.find().then(docs => {
        res.send(docs)
    },err => res.status(400).send(err));
});

app.post('/api/photos',(req,res) => {
    res.send('heloo')
});

app.listen(port, () => console.log('Server started on port ' + port));