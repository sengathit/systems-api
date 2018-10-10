const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

const sketchSchema = require('./models/sketch.model');
const dbURL = 'mongodb://sengathit:Slavanh77@ds117423.mlab.com:17423/sketch';

mongoose.connect(dbURL,{ useNewUrlParser: true });

const port = process.env.PORT || 3000;
let doodles = mongoose.model('Doodles', sketchSchema,'doodles');

app.get('/',(req, res) => {
    res.send('Hello world');
});

app.get('/api/photos',cors(corsOptions),(req,res) => {
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