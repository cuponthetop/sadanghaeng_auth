"use strict";
process.env.NODE_ENV = 'test';

var chai = require('../helper/setup-chai')
  , clients = require('../init/json/clients.json')
  , request = require('supertest')('http://localhost:5003')
  ;

describe('Auth', () => {
  var testClient = clients[0];
  var clientSecret = testClient.clientSecret;
  var clientCredentials = testClient.clientId + ':' + clientSecret;

  describe('Login with Password', () => {

    var accessToken;
    var refreshToken;

    it('should not allow request to authorise without token', (done) => {
      request
        .post('/auth/v1/authorise')
        .expect(400, done);
    });

    it('should allow tokens to be requested', (done) => {
      request
        .post('/auth/v1/token')
        .type('form')
        .auth(clientCredentials, '')
        .send({
          grant_type: 'password',
          username: '11bc6f7b9b0d0b0457673daf',
          password: 'test'
        })
        .expect(200)
        .end((err, res) => {
          accessToken = res.body.access_token;
          refreshToken = res.body.refresh_token;

          res.body.should.contain.keys(['access_token', 'refresh_token']);

          done();
        });
    });

    it('should allow users to authorise with valid access token', (done) => {
      request
        .post('/auth/v1/authorise')
        .set('Authorization', 'Bearer ' + accessToken)
        .expect(200)
        .end((err, res) => {
          res.body.should.contain.keys(['userId']);

          done();
        });
    });

  });
});
