const express = require('express');

const friends = require('../friends/friendsModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({
    api: 'up and running'
  });
});

server.get('/friends', async (req, res) => {
  const allFriends = await friends.getAll();
  res.status(200).json(allFriends);
});

server.post('/friends', async (req, res) => {
  try {
    const newFriend = req.body;
    const friend = await friends.insert(newFriend);
    res.status(201).json({
      newFriend: friend
    })
  } catch (err) {
    res.status(500).json({
      err: 'Friend could not be added.'
    })
  }
})

server.delete('/friends/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const friend = await friends.remove(id);
    res.status(204).json({ friend })
  } catch (error) {
    res.status(500).json({
      error: "The friend could not be removed"
    })
  }
})


module.exports = server;