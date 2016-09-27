if (!process.env.CI) {
  require('dotenv').load();
}

const supertest = require('supertest')
const chai = require('chai');
const assert = chai.assert;

const server = supertest.agent(`http://localhost:${process.env.PORT}`);

describe('Access', function() {
  it('should not allow non authenticated users', done => {
    server
     .get('/admin')
     .end((err, res) => {
       assert.notEqual(res.status, 200, 'Blocks access');
       done();
     });
  });

  it('should allow authenticated users', done => {
    server
     .get('/admin')
     .set('Cookie', ['authenticated=true'])
     .end((err, res) => {
       assert.equal(res.status, 200, 'Allows access');
       done();
     });
  });
});

describe('Config', function() {
  it('should allow authenticated users to access the config page', done => {
    server
     .get('/admin/variables')
     .set('Cookie', ['authenticated=true'])
     .end((err, res) => {
       assert.equal(res.status, 200, 'Allows access');
       done();
     });
  });

  it('should allow authenticated users to edit config variables', done => {
    server
     .post('/admin/variables')
     .send({onboardingToggle: true, developerToggle: true, disabledCampaigns: '1,2,3'})
     .set('Cookie', ['authenticated=true'])
     .end((err, res) => {
       assert.equal(res.status, 302, 'Allows editing');
       done();
     });
  });

  it('should not allow authenticated users to edit config when missing variables', done => {
    server
     .post('/admin/variables')
     .send({onboardingToggle: true, disabledCampaigns: '1,2,3'})
     .set('Cookie', ['authenticated=true'])
     .end((err, res) => {
       assert.notEqual(res.status, 302, 'Disallows editing');
       done();
     });
  });
});
