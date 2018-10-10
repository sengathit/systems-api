const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const sketchSchema = require('./models/sketch.model');
const dbURL = 'mongodb://sengathit:Slavanh77@ds117423.mlab.com:17423/sketch';

mongoose.connect(dbURL,{ useNewUrlParser: true });

const port = process.env.PORT || 3000;
let doodles = mongoose.model('Doodles', sketchSchema);

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
    // let upload = new doodles({title: body.title,description: body.description, img: body.img});
    // upload.save().then(doc => {
    //     res.send(doc);
    // });
    doodles.title = body.title;
    doodles.img = body.img;
    doodles.description = body.description;
    doodles.save((err,doc) => {
        if(err){
            res.status(400).send(err);
        }else{
            res.send(doc);
        }
    });
    
});

app.listen(port, () => console.log('Server started on port ' + port));