const express = require('express');
const router = express.Router();
const UserData = require("../models/userSchema");
const PhotoData = require("../models/photoSchema");

// INDEX
router.get('/', (req,res) => {
    PhotoData.find({}, (err, allPhotos) => {
        if (err) {
            console.log(err);
        } else {
            res.render('photos/index.ejs', {
                photos: allPhotos
            });
        }
    });
});

// NEW
router.get('/new', (req,res) => {
    // get the new form
    res.render('photos/new.ejs');
});

// SHOW
router.get('/:id', async (req,res) => {

    try {
        const thisUser = await UserData.findOne({ 'pictures._id': req.params.id });
        const thisPhoto = await PhotoData.findById(req.params.id);
        console.log(thisUser);
        res.render('photos/show.ejs', {
            photo: thisPhoto,
            user: thisUser
        });
    } catch (err){
        res.send(err);
    }

});

// EDIT
router.get('/:id/edit', async (req,res) => {

    try {
    const thisUser = await UserData.findOne({ 'pictures._id' : req.params.id });
    const thisPhoto = await PhotoData.findById(req.params.id);

    res.render('photos/edit.ejs', {
        photo: thisPhoto,
        user: thisUser
    }); 
    } catch (err){
        res.send(err);
    }

});

// CREATE
router.post('/', (req,res) => {
    // check for valid username
    UserData.findOne( { username : req.body.username } , (err, foundUser) => {
        console.log(`HERE IS THE ERROR: ${err}`);
        if (foundUser) {
            PhotoData.create(
            {
                username: req.body.username,
                url: req.body.src
            }, (err, createdPhoto) => {
            if (err) {
                res.send(err);
            } else {
                // this action is happening on express not in mongo
                // mongo has no idea this has happened
                foundUser.pictures.push(createdPhoto);
        
                // Write back to mongo and say that we added something to the document
                foundUser.save((err, data) => {
                // responding back to the client!
                    res.redirect('/photos');
                })
            }
            });
        } else {
            res.redirect('/photos');
        }
    });// end of Author Query
});

// UPDATE
router.put('/:id', async (req,res) => {

    try {
        // const updatedUser = await UserData.findOneAndUpdate({'pictures._id':req.params.id}, {username:req.body.username} );
        const updatedPhoto = await PhotoData.findByIdAndUpdate(req.params.id, req.body.url);
        res.redirect('/photos');
    } catch(err){
        res.send(err);
    }
    
});

// DELETE
router.delete('/:id', async (req,res) => {

    try {
        const thisUser = await UserData.findOne({'pictures._id':req.params.id});
        const deletedPhoto = await PhotoData.findByIdAndDelete(req.params.id);
        thisUser.pictures.id(req.params.id).remove();
        await thisUser.save();
        res.redirect('/photos');
    } catch (err) {
        res.send(err);
    }

});

module.exports = router;