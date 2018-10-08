const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const sketchSchema = require('./models/sketch.model');
const dbURL = 'mongodb://sengathit:Slavanh77@ds117423.mlab.com:17423/sketch';

mongoose.connect(dbURL,{ useNewUrlParser: true });

const port = process.env.PORT || 3000;

app.get('/',(req, res) => {
    res.send('Hello world');
});

app.get('/api/photos',cors(),(req,res) => {
    let doodle = mongoose.model('Doodles', sketchSchema);
    doodle.find().then(docs => {
        res.send(docs)
    },err => res.status(400).send(err));
    // if(!sketch){
    //     res.status(400).send({err: 'nada'})
    // }else{

    //     let data = sketch.find();
    //     res.send(data);
    // }
});

app.listen(port, () => console.log('Server started on port ' + port));