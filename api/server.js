const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../routes/auth/auth-router.js');
const itemRouter = require('../routes/items/items-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/items', itemRouter);

server.get("/", (req, res) => {
    res.send({Success: "api working..."})
})

module.exports = server;
