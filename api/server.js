const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../routes/auth/auth-router.js');
const itemRouter = require('../routes/items/items-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/', () => {
    return "hello heroku";
})
server.use('/api/auth', authRouter);
server.use('/api/items', itemRouter);

module.exports = server;
