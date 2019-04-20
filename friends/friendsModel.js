
const db = require('../data/dbConfig.js');
const friends = require('../friends/friendsModel.js');

// this file give us specific methods to be used at endpoints
module.exports = {
  getAll,
  insert,
  remove,
};

function getAll() {
  return db('friends');
}

async function insert(friend) {
  const [id] = await db('friends').insert(friend)
  return db('friends').where({id}).first();
}

function remove(id) {
  return db('friends')
    .where('id', id)
    .del();
}

