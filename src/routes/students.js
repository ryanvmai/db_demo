const router = require('express').Router();
let Student = require('../models/student.model');

// Get Request
router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a student
router.route('/id/:id').get((req, res) => {
    Student.findById(req.params.id)
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/year/:year').get((req, res) => {
    Student.find( {year: req.params.year} )
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/name/:name').get((req, res) => {
    var name = req.params.name.replace('-', ' ');
    Student.find( {name: name} )
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Post Request
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const year = Number(req.body.year);
    const gpa = Number(req.body.gpa);

    const newStudent = new Student({
        name,
        age,
        gender,
        year,
        gpa,
    });

    newStudent.save()
    .then(() => res.json('Student added to database'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete request
router.route('/delete/:id').post((req, res) => {
    Student.findByIdAndDelete(req.params.id)
     .then(() => res.json('Student deleted'))
     .catch(err => res.status(400).json('Error: ' + err));
});

// Update Request
router.route('/update/:id').post((req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      student.name = req.body.name;
      student.age = Number(req.body.age);
      student.gender = req.body.gender;
      student.year = Number(req.body.year);
      student.gpa = Number(req.body.gpa);


      student.save()
        .then(() => res.json('Student updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;