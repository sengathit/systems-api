const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

let corsOptions = {
    origin: '*'
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const sketchSchema = require('./models/sketch.model');
const dbURL = 'mongodb://sengathit:Slavanh77@ds117423.mlab.com:17423/sketch';

mongoose.connect(dbURL,{ useNewUrlParser: true });

const port = process.env.PORT || 3000;
let doodles = mongoose.model('Doodles', sketchSchema,'doodles');

app.get('/',(req, res) => {
    res.send('Hello world');
});

app.get('/api/photos',(req,res) => {
    doodles.find().then(docs => {
        res.send(docs)
    },err => res.status(400).send(err));
});

app.post('/api/photos',(req,res) => {
    let body = req.body;
    let upload = new doodles({title: body.title, description: body.description, img: body.img});
    upload.save((err,doc) => {
        if(err) {
            res.status(400).send(err);
            return;
        }else{
            res.send(doc)
        }
    });
    
});

app.listen(port, () => console.log('Server started on port ' + port));