const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
            if(decodedToken) {
                next();
            } else {
                res.send(error);
            }
        })
    } else {
        res.status(401).json({ message: 'Could not verify Credentials'});
    }
}