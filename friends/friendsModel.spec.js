const Friends = require('./friendsModel');
const db = require('../data/dbConfig');

describe('The Friends Model', () => {

  describe('insert()', () => {
    beforeEach(() => {
      return db('friends').truncate();
    })

    it('should insert a friend into the db', async () => {
      await Friends.insert({ name: 'joey' });
      const friends = await db('friends');
      expect(friends.length).toBe(1);
      expect(friends[0].name).toBe('joey');
    })

    it('should return the inserted friend with id', async () => {
      const friend = await Friends.insert({ name: 'chandler' });
      expect(friend.id).toBe(1);
      expect(friend.name).toBe('chandler');
    })
  })

  describe('remove()', () => {
    beforeEach(() => {
      return db('friends').truncate();
    })
    it('should remove a friend from the db', async () => {
      const friend = await Friends.insert({ name: 'chandler' });
      const removed = await Friends.remove(friend.id);
      // expect(friend.id).toBe(1);
      expect(removed).toBe(1);
    })
  })

})
