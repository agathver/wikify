process.env.NODE_ENV = 'test';
var request = require('supertest');
var app = require('../app');
app.set('env','test');
describe('app entry', function() {
    it('should request the home page correctly', function(done) {
        request(app).get('/').expect(200, done);
    });
    it('should generate a 404 for a non existent file', function(done) {
        request(app).get('/mcbjabcbhjagwhdhjkhdkek2kh').expect(404, done);
    });
});