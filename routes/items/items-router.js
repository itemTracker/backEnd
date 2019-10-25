const router = require('express').Router();
const restricted = require('../auth/auth-middleware.js');

const item = require('./items-model.js');

router.get('/', restricted, (req, res) => {
    item.find()
        .then( items => {
            res.status(200).json(items);
        })
        .catch( error => {
            res.status(500).json({message: 'Could not get items'});
        })
})

router.post('/new', restricted, (req, res) => {
    const newItem = req.body;

    item.add(newItem)
        .then( added => {
            res.status(201).json(added);
        })
        .catch( error => {
            res.status(500).json({message: 'item could not be added', error: error});
        })
})