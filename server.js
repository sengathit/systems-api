const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

mongoose.connect(dbURL,{ useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const sketchSchema = require('./models/sketch.model');
const dbURL = 'mongodb://sengathit:Slavanh77@ds117423.mlab.com:17423/sketch';

const port = process.env.PORT || 3000;
let doodles = mongoose.model('Doodles', sketchSchema);

app.get('/',(req, res) => {
    res.send('Hello world');
});


app.post('/api/photos',(req,res) => {
    let body = req.body;
    let doodle = new doodles({title: body.title});
    doodle.save((err
    ) => {
        if(err) {
            res.status(400).send(err);
        }else{
            res.send(body);
        }
    });
    
});

app.listen(port, () => console.log('Server started on port ' + port));