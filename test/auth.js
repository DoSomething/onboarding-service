if (!process.env.CI) {
  require('dotenv').load();
}

const supertest = require('supertest')
const chai = require('chai');
const assert = chai.assert;

const server = supertest.agent(`http://localhost:${process.env.PORT}`);

describe('Login', function() {
  it('should allow admins to login', done => {
    server
     .post('/login')
     .send({'email': 'ds-api@dosomething.org', 'password': process.env.TEST_ADMIN_PASSWORD})
     .end((err, res) => {
       assert.equal(res.header['location'], '/admin', 'redirects properly');
       assert.lengthOf(res.header['set-cookie'], 1), 'auth header is set';
       assert.include(res.header['set-cookie'][0], 'authenticated=true', 'auth header is true');
       done();
     });
  });

  it('should not allow users to login', done => {
    server
     .post('/login')
     .send({'email': 'jkent+3939@dosomething.org', 'password': process.env.TEST_USER_PASSWORD})
     .end((err, res) => {
       assert.equal(res.header['location'], '/', 'redirects properly');
       assert.notProperty(res.header, 'set-cookie', 'auth header is not set');
       done();
     });
  });

  it('should allow you to logout', done => {
    server
     .get('/logout')
     .end((err, res) => {
       assert.equal(res.header['location'], '/', 'redirects properly');
       assert.lengthOf(res.header['set-cookie'], 1), 'auth header is set';
       assert.include(res.header['set-cookie'][0], 'authenticated=;', 'auth header is cleared out');
       done();
     });
  });
});
