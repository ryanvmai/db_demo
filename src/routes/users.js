const router = require('express').Router();
const { json, Router } = require('express');
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('../../passport-config');

// Get all users - terribly insecure, obviously. This should not be visible!
router.route('/').get((req, res) => {
    //res.json('Permission denied');
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get user by id
router.route('/id/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Delete user
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
     .then(() => res.json('User deleted'))
     .catch(err => res.status(400).json('Error: ' + err));
});

// Update user - you can change your name and password only!
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        user.name = req.body.name;
        //user.username = User.username;
        user.password = bcrypt.hashSync(req.body.password, 10);
  
        user.save()
          .then(() => res.json('User details updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});
  

module.exports = router;