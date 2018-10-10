const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
let doodles = mongoose.model('Doodles', sketchSchema);

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const sketchSchema = require('./models/sketch.model');
const dbURL = 'mongodb://sengathit:Slavanh77@ds117423.mlab.com:17423/sketch';

mongoose.connect(dbURL,{ useNewUrlParser: true });

const port = process.env.PORT || 3000;

app.get('/',(req, res) => {
    res.send('Hello world');
});


app.post('/api/photos',(req,res) => {
    let body = req.body;
    let doodle = new doodles({title: body.title});
    doodle.save().then(doc => {
        res.send(doc)
    },e => res.send(e));
    
});

app.listen(port, () => console.log('Server started on port ' + port));