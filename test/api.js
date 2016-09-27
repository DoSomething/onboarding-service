require('dotenv').load();

const supertest = require('supertest')
const chai = require('chai');
const assert = chai.assert;

const server = supertest.agent(`http://localhost:${process.env.PORT}`);

describe('Config - Api', function() {
  it('should allow you to retrieve the configuration', done => {
    server
     .get('/api/v1/config/1000')
     .end((err, res) => {
       assert.equal(res.status, 200, 'Returns without error code');
       assert.isDefined(res.body, 'Returns response');

       assert.isDefined(res.body.config, 'Returns config');
       assert.isDefined(res.body.config.enabled, 'Returns enabled');
       assert.isBoolean(res.body.config.enabled, 'enabled is boolean');
       assert.isDefined(res.body.config.developerMode, 'Returns developerMode');
       assert.isBoolean(res.body.config.developerMode, 'developerMode is boolean');
       assert.isDefined(res.body.config.campaignEnabled, 'Returns campaignEnabled');
       assert.isBoolean(res.body.config.campaignEnabled, 'campaignEnabled is boolean');

       assert.isDefined(res.body.slides, 'Returns slides');
       assert.isArray(res.body.slides, 'Slides is array');

       done();
     });
  });

  it('should disable the campaign if configured to do so', done => {
    // Setup disabled campaigns
    server
     .post('/admin/variables')
     .send({onboardingToggle: true, developerToggle: true, disabledCampaigns: '1,2,3'})
     .set('Cookie', ['authenticated=true'])
     .end((err, res) => {

       server
        .get('/api/v1/config/1')
        .end((err, res) => {
          assert.isFalse(res.body.config.campaignEnabled, 'Returns campaignEnabled is false');

          server
           .get('/api/v1/config/20000')
           .end((err, res) => {
             assert.isTrue(res.body.config.campaignEnabled, 'Returns campaignEnabled is true');
             done();
           });
        });
     });
  });
});
