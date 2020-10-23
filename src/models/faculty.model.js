const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facultySchema = new Schema({
    name: String,
    age: Number,
    gender: String,
    address: String,
    department: String,
    position: String,
}, {
    timestamps: true,
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;