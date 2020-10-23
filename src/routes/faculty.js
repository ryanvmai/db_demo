const router = require('express').Router();
let Faculty = require('../models/faculty.model');

// Get request
router.route('/').get((req, res) => {
    Faculty.find()
        .then(faculty => res.json(faculty))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get request with parameters
router.route('/id/:id').get((req, res) => {
    Faculty.findById(req.params.id)
    .then(faculty => res.json(faculty))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/age/:age').get((req, res) => {
    Faculty.find({age: req.params.age})
    .then(faculty => res.json(faculty))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/department/:department').get((req, res) => {
    Faculty.find({department: req.params.department})
    .then(faculty => res.json(faculty))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Post request
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const address = req.body.address;
    const department = req.body.department;
    const position = req.body.position;

    const newFaculty = new Faculty({
        name,
        age,
        gender,
        address,
        department,
        position,
    });

    newFaculty.save()
        .then(() => res.json('Faculty added to database'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Request
router.route('/delete/:id').delete((req, res) => {
    Faculty.findByIdAndDelete(req.params.id)
    .then(() => res.json('Faculty deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Request
router.route('/update/:id').post((req, res) => {
    Faculty.findByIdAndUpdate(req.params.id)
    .then(faculty => {
        faculty.name = req.body.name;
        faculty.age = Number(req.body.age);
        faculty.gender = req.body.gender;
        faculty.address = req.body.address;
        faculty.department = req.body.department;
        faculty.position = req.body.position;

        faculty.save()
            .then(() => res.json('Faculty updated'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Exports
module.exports = router;