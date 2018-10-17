const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const buffer = require('buffer');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const multer = require('multer');
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors()); 
app.use(express.static('./public/uploads'));

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('bufferImage',(index) => {
    return new Buffer(index).toString('base64');
});

const sketchSchema = require('./models/sketch.model');
const dbURL = 'mongodb://sengathit:Slavanh77@ds117423.mlab.com:17423/sketch';

mongoose.connect(dbURL,{ useNewUrlParser: true });

const port = process.env.PORT || 3000;
let doodles = mongoose.model('Doodles', sketchSchema,'doodles');

let storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});

let upload = multer({
    storage: storage
}).single('img');

app.get('/',(req, res) => {
    res.render('home',{title: 'YOLO',img: 'hey'});
});

app.get('/api/photos',(req,res) => {
    doodles.find().then(docs => {
        res.send(docs)
    },err => res.status(400).send(err));
});

app.get('/upload',(req, res) => {
    res.render('upload');
});

app.post('/uploaded',upload,(req,res) => {
    // res.render('home',{title: req.body.title, description: req.body.description, img: req.file.destination + '/' + req.file.filename})
    // let upload = new doodles({title: req.file.originalname, description: req.file.originalname, img: imgBuffed});
    let doodle = new doodles();
    doodle.img.data = fs.readFileSync(req.file.path);
    doodle.img.contentType = 'image/jpeg';
    doodle.title = req.body.title;
    doodle.description = req.body.description;
    doodle.save((err,doc) => {
        if(err) {
            res.status(400).send(err);
            return;
        }else{
            res.render('home');
        }
    });
});

app.get('/loadImage',(req,res) => {
    doodles.find().then(docs => {
        let datas = docs;
        // console.log
        // console.log(data[0].img.data);
        // let img = img.data.$binary
        // var thumb = new Buffer(data[1].img.data).toString('base64');

        res.render('loadImage',{datas: datas});
    });
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