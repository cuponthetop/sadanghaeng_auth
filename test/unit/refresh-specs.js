"use strict";
process.env.NODE_ENV = 'test';

var chai = require('../helper/setup-chai')
  , request = require('supertest')('http://localhost:3003')
  , AccessTokenCtrl = require('../../lib/controller/accesstoken')
  , mongoose = require('mongoose')
  , config = require('../../config/config')
  ;

describe('Auth', () => {
  var clientSecret = '123';
  var clientCredentials = 'garim-test' + ':' + clientSecret;

  describe('Login with token refresh', () => {

    var accessToken;
    var newAccessToken;
    var refreshToken;


    before(() => {
      // 몽고 db 연결
      var dbUri = config.db.uri + config.db.dbName;
      var dbOptions = { username: config.db.username, password: config.db.password };
      mongoose.connect(dbUri, dbOptions);
    });

    after(() => {
      mongoose.disconnect();
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

          request
            .post('/auth/v1/authorise')
            .set('Authorization', 'Bearer ' + accessToken)
            .expect(200)
            .end((err2, res2) => {
              done();
            });
        });
    });

    it('should forbid access with an expired access token', (done) => {
      AccessTokenCtrl.getAccessToken(accessToken, (err, token) => {
        // set access Token's expiration date
        AccessTokenCtrl.saveAccessToken(token.accessToken, token.clientId, new Date(1), token.userId, function () {
          request
            .post('/auth/v1/authorise')
            .set('Authorization', 'Bearer ' + accessToken)
            .expect(401, done);
        });
      });
    });

    it('should allow the refresh token to be used to get a new access token', (done) => {
      request
        .post('/auth/v1/token')
        .auth(clientCredentials, '')
        .type('form')
        .send({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        .expect(200)
        .end((err, res) => {

          newAccessToken = res.body.access_token;
          refreshToken = res.body.refresh_token;

          res.body.should.contain.keys(['access_token', 'refresh_token']);
          done();
        });
    });

    it('should allow access with new access token', (done) => {
      request
        .post('/auth/v1/authorise')
        .set('Authorization', 'Bearer ' + newAccessToken)
        .expect(200, done);
    });

  });
});
