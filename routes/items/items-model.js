const db = require('../../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById
}

function add(item) {
    return db('items').insert(item); 
}

function find() {
    return db('items')
           .select('id', 'name', 'issue_num');
}

function findBy(filter) {
    return db('items').where(filter);
}

function findById(id) {
    return db('items')
           .where({ id })
           .first()
}