const server = require('./server.js');
const request = require('supertest');
const db = require('../data/dbConfig');

describe('the server', () => {

  describe('GET /', () => {
    it('should return status 200', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    })
    it('should return { api: "up and running" }', async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ 'api': 'up and running' })
    })
  })

  describe('GET /friends', () => {
    it('should return status 200', async () => {
      const res = await request(server).get('/friends');
      expect(res.status).toBe(200);
    })
    it('should return JSON', async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json')
    })
  })

  describe('POST /friends', () => {
    beforeEach(() => {
      return db('friends').truncate();
    })

    it('should return status 200 when body is correct', async () => {
      const body = { name: 'ross' }
      const res = await request(server).post('/friends').send(body);
      expect(res.status).toBe(201);
    })

    it('should return status 500 when body is incorrect', async () => {
      const body = {  }
      const res = await request(server).post('/friends').send(body);
      expect(res.status).toBe(500);
    })

  })

  describe('DELETE /friends/id', () => {
    beforeEach(() => {
      return db('friends').truncate();
    })

    it('should return status 204 successfully deleted', async () => {
      const body = { name: 'joey' }
      await request(server).post('/friends').send(body);
      const res = await request(server).delete('/friends/1');
      console.log(res)
      expect(res.status).toBe(204);
    })

    it('should return status 404 if id is not found', async () => {
      const res = await request(server).delete('/friends/100');
      expect(res.status).toBe(404);
    })

  })


})