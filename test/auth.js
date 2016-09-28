require('dotenv').load();

const supertest = require('supertest')
const chai = require('chai');
const assert = chai.assert;

const decode = require('client-sessions').util.decode;
const cookieOptions = {
  cookieName: 'onboarding',
  secret: process.env.COOKIE_SECRET
};

function decodeHeader(res) {
  // This is the original string,
  // 'set-cookie': [ 'onboarding=ByJ96eKKfXW_o8yPDdmj1Q.RnhoKgmKtxmCOfLq0B0qFSQIqZux2WZvfyIkA8BzWKnWRF3C5MbjJxCOwPk17owZ.1475082327292.86400000.6ug_fkdd_oFQLEI7dwWRBljSqrJX4nTOxx8JJYY3SeQ; path=/; expires=Thu, 29 Sep 2016 17:05:28 GMT; httponly' ],
  const authHeader = res.header['set-cookie'][0].split(' ')[0].replace('onboarding=', '').replace(';', '');
  const decodedAuthHeader = decode(cookieOptions, authHeader);

  return decodedAuthHeader;
}

const server = supertest.agent(`http://localhost:${process.env.PORT}`);

describe('Login', function() {
  it('should allow admins to login', done => {
    server
     .post('/login')
     .send({'email': 'ds-api@dosomething.org', 'password': process.env.TEST_ADMIN_PASSWORD})
     .end((err, res) => {
       assert.equal(res.header['location'], '/admin', 'redirects properly');
       assert.lengthOf(res.header['set-cookie'], 1), 'auth header is set';

       const decodedAuthHeader = decodeHeader(res);
       assert.isDefined(decodedAuthHeader, 'auth header was encoded properly');
       assert.deepEqual(decodedAuthHeader.content, {authenticated: 'true'}, 'auth header shows authentication');

       done();
     });
  });

  it('should not allow users to login', done => {
    server
     .post('/login')
     .send({'email': 'jkent+3939@dosomething.org', 'password': process.env.TEST_USER_PASSWORD})
     .end((err, res) => {
       assert.equal(res.header['location'], '/', 'redirects properly');

       const decodedAuthHeader = decodeHeader(res);
       assert.isDefined(decodedAuthHeader, 'auth header was encoded properly');
       assert.deepEqual(decodedAuthHeader.content, {authenticated: 'false'}, 'auth header shows failed authentication');

       done();
     });
  });

  it('should allow you to logout', done => {
    server
     .get('/logout')
     .end((err, res) => {
       assert.equal(res.header['location'], '/', 'redirects properly');

       const decodedAuthHeader = decodeHeader(res);
       assert.isDefined(decodedAuthHeader, 'auth header was encoded properly');
       assert.deepEqual(decodedAuthHeader.content, {}, 'auth header is cleared'); //Trust me, .equal({}, {}) doesn't work. :javascript:

       done();
     });
  });
});
