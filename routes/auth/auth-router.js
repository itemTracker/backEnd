const router = require('express').Router();
const bcrypt = require('bcryptjs');
const tokenGen = require('./tokenGenerator.js');

const Users = require('./auth-model.js');


router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        // set request body to user.
        let user = req.body;

        // hash password
        const hash = bcrypt.hashSync(user.password, 10);
        // set hashed password to user password
        user.password = hash;

        // add new User
        const newUser = await Users.add(user);

        if (newUser) {
            res.status(201).json(newUser);
        } else {
            res.status(401).json({ message: 'error adding user'});
        }
    } catch (error) {
        res.status(500).json({ message: 'could not add user', error: error.message});
    }
})

router.post('/login', (req, res) => {
    // using deconstructing to take username and password from request body.
    let { username, password } = req.body;

    // locating user based on username provided in request body.
    Users.findBy({ username })
    // grabs first match.
    .first()
        .then(user => {
            // check if user is true and that the password matches user.password
            if (user && bcrypt.compareSync(password, user.password)) {
            // generates token using tokenGenerator.js
            const token = tokenGen.generateToken(user);

            res.status(200).json({ message: `Welcome ${user.username}`, token});
        } else {
            res.status(401).json({ message: 'Invalid Credentials'})
        }
    })
    .catch (error => {
        res.status(500).json({ message: 'Please provide valid Credentials', error: error});
    })
})

module.exports = router;