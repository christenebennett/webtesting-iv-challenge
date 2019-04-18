const express = require('express');

const friends = require('../friends/friendsModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up and running' });
});

server.get('/friends', async (req, res) => {
  
});

module.exports = server;