const express = require('express');
const router = express.Router();
const UserData = require("../models/userSchema");
const PhotoData = require("../models/photoSchema");

// INDEX
router.get('/', (req,res) => {
    UserData.find({}, (err, allUsers) => {
        if (err) {
            console.log(err);
        } else {
            res.render('users/index.ejs', {
                users: allUsers
            });
        }
    });
});

// NEW
router.get('/new', (req,res) => {
    // get the new form
    res.render('users/new.ejs');
});

// SHOW
router.get('/:id', (req,res) => {
    UserData.findById(req.params.id, (err, thisUser) => {
        if (err) {
            console.log(err);
        } else {
            res.render('users/show.ejs', {
                user: thisUser
            });
        }
    });
});

// EDIT
router.get('/:id/edit', (req,res) => {
    UserData.findById(req.params.id, (err, thisUser) => {
        if (err) {
            console.log(err);
        } else {
            res.render('users/edit.ejs', {
                user: thisUser
            });
            // console.log(`WE ADDED: ${thisUser}`);
        }
    })
});

// CREATE
router.post('/', (req,res) => {
    UserData.create(
        req.body, (err, thisUser) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/users');
        }
    })
});

// UPDATE
router.put('/:id', (req,res) => {

    UserData.findByIdAndUpdate(req.params.id, req.body, (err, thisUser) => {
        if (err){
            console.log(err);
        } else {
            // console.log(`UPDATED: ${thisUser}`);
            res.redirect('/users');
        }
    })

});

// DELETE
router.delete('/:id', async (req,res) => {

    try {
        const deletedUser = await UserData.findByIdAndDelete(req.params.id);
        const articleIds = [];
        // Collect all of the deletedAUthor's article's ID's
        for(let i = 0; i < deletedUser.pictures.length; i++){
          articleIds.push(deletedUser.pictures[i]._id);
        }
    
        await PhotoData.deleteMany({ _id: { $in: articleIds } });
    
        res.redirect('/users');
      }
      catch(err){
        res.send(err);
      }

});

module.exports = router;