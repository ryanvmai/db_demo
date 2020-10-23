const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    year: { type: Number, required: true },
    gpa: { type: Number, required: true },
  }, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;