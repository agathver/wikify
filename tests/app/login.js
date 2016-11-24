process.env.NODE_ENV = 'test';
var request = require('supertest');
var app = require('../app');

describe('login', function() {
    it('should request the login page correctly', function(done) {
        request(app).get('/login').expect(200, done);
    });
    it('should generate a 400 for an incorrect post request', function(done) {
        request(app).post('/login').expect(400, done);
    });

    it('should correctly login with a valid username');

    it('should return 403 on an incorrect username/password', function(done) {
    	request(app).post('/login').field('username','bogus').field('password','bogus').expect(403, done);
    });
});