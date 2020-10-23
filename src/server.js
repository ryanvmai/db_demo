const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Successfully established connection to mongoDB Atlas Cloud Database');
});

// Routes
const studentRouter = require('./routes/students');
const facultyRouter = require('./routes/faculty');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

app.use('/students', studentRouter);
app.use('/faculty', facultyRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// Start server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})