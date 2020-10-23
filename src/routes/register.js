const router = require('express').Router();
let User = require('./../models/user.model');
const bcrypt = require('bcrypt');

// Register Post Request
router.route('/').post(async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const rawPassword = req.body.password;
    
    try {
        const password = await bcrypt.hash(rawPassword, 10);

        const newUser = new User({
            name,
            username,
            password,
        });

        newUser.save()
            .then(() => res.json('User added to database'))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch {
        res.json('Error')
    }
});

module.exports = router;