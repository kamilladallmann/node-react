const express = require('express');
const authMiddleware = require('../middleware/auth');
const Photo = require('../models/photo');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){ 
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    
    if(file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/gif'
    ){
        cb(null, true); //accept a file
    }else {//reject a file
        cb(null, false);        
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{
        Photo.find({}, function(err, data){
            if(err)
                console.log(err);
            res.render('list', {data: data});
        });
        
        //const photos = await Photo.find().populate('user');
        
        //return res.send({photos});
    }catch(err){
        return res.status(400).send({error: 'Error loading photos'});
    }
});

/* router.get('/:photoId', async(req, res) => {
    try{
        const photo = await Photo.findById(req.params.photoId).populate('user');

        return res.send({photo});
    }catch(err){
        return res.status(400).send({error: 'Error loading photo'});
    }
});  */

router.post('/', upload.any(), async(req, res) => {
    
    try{

        if (!req.body && !req.files) {
            res.json({ success: false });
          } else {
            var c;
            Photo.findOne({}, function (err, data) {
              console.log("into photo");
        
              if (data) {
                console.log("if");
                c = data.unique_id + 1;
              } else {
                c = 1;
              }
        
              var photo = new Photo({
                unique_id: c,
                name: req.body.title,
                imagem: req.files[0].path,
              });
        
              photo.save(function (err, Person) {
                if (err)
                  console.log(err);
                else
                  res.redirect('/photos');        
              });
        
            }).sort({ _id: -1 }).limit(1);
        }
    }

        /*const photo = await new Photo({
            user: req.userId,
            title: req.body.title,
            description: req.body.description,
            imagem: req.files[0].filename
        });
        photo.save();
        console.log(photo);
        return res.send({photo}); */
        catch(err){
        return res.status(400).send({error: 'Error creating new photo'});
    }
});

router.get('/buscar', function(req, res) {
    try{
        Photo.find({name: req.query.nome}, function (err, data){
            if(err)
                console.log(err);
            console.log(data);
            res.render('list', {data: data});
        });
        /* const photo = await Photo.find({title: req.params.photoTitle}).populate('user');
        return res.send({photo}); */
    }catch(err){
        return res.status(400).send({error: 'Error finding photo'})
    }
});

module.exports = app => app.use('/photos', router);