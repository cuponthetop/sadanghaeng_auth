"use strict";
process.env.NODE_ENV = 'test';

// var assert = require('assert')
//   , should = require('should')
//   , request = require('supertest')('http://localhost:3001')
//   , accessTokenCtrl = require('../../lib/controller/accesstoken')
//   ;

// describe('OAuth request auth code', function () {
//   var authCode;
//   var accessToken;
//   var refreshToken;
//   var clientSecretBase64 = new Buffer('123').toString('base64');
//   var clientCredentials = 'garim-test' + clientSecretBase64;
//   var cookies;

//   // before(function (done) {
//   //   request
//   //   .post('/session')
//   //   .send({
//   //     email: 'test@test.com',
//   //     password: 'test'
//   //   })
//   //   .end(function (err, res) {
//   //     cookies = res.headers['set-cookie'];
//   //     done(err);
//   //   });
//   // });

//   // it('should allow code to be requested', function (done) {
//   //   request
//   //     .post('/auth/v1/authorise')
//   //     .type('form')
//   //     .set('Cookie', cookies)
//   //     .send({
//   //       allow: 'yes',
//   //       client_id: 'garim-test',
//   //       client_secret: '123',
//   //       response_type: 'code',
//   //       redirect_uri: '/oauth/redirect'
//   //     })
//   //     .expect(302)
//   //       .end(function (err, res) {
//   //         res.header['location'].should.include('code')
//   //         var url = res.header['location'];
//   //         authCode = url.substr(url.indexOf('code=') + 5);
//   //         done();
//   //       });
//   // });

//   // it('should allow tokens to be requested with auth code', function (done) {
//   //   request
//   //     .post('/auth/v1/token')
//   //     .type('form')
//   //     .auth(clientCredentials, '')
//   //     .send({
//   //       grant_type: 'authorization_code',
//   //       code: authCode,
//   //       client_id: 'garim-test',
//   //       client_secret: '123',
//   //       refresh_token: refreshToken
//   //     })
//   //     .expect(200)
//   //     .end(function (err, res) {
//   //       assert(res.body.access_token, 'Ensure the access_token was set');
//   //       assert(res.body.refresh_token, 'Ensure the refresh_token was set');
//   //       accessToken = res.body.access_token;
//   //       refreshToken = res.body.refresh_token;
//   //       done();
//   //     });
//   // });

//   // it('should permit access to routes that require a refresh_token', function (done) {
//   //   request
//   //     .get('/secret')
//   //     .set('Authorization', 'Bearer ' + accessToken)
//   //     .expect(200, done);
//   // });

//   // it('should allow the refresh token to be used to get a new access token', function (done) {
//   //   request
//   //     .post('/auth/v1/token')
//   //     .type('form')
//   //     .auth(clientCredentials, '')
//   //     .send({
//   //       grant_type: 'refresh_token',
//   //       username: 'test@test.com',
//   //       password: 'test',
//   //       client_id: 'garim-test',
//   //       client_secret: '123',
//   //       refresh_token: refreshToken
//   //     })
//   //     .expect(200)
//   //     .end(function (err, res) {
//   //       assert(res.body.access_token, 'Ensure the access_token was set');
//   //       assert(res.body.refresh_token, 'Ensure the refresh_token was set');
//   //       accessToken = res.body.access_token;
//   //       refreshToken = res.body.refresh_token;

//   //       done();
//   //     });
//   // });

//   // it('should forbid access with an expired access token', function (done) {
//   //   var getAccessToken = accessTokenCtrl.getAccessToken;
//   //   var saveAccessToken = accessTokenCtrl.saveAccessToken;

//   //   getAccessToken(accessToken, function (err, token) {
//   //     saveAccessToken(token.accessToken, token.clientId, new Date(1), token.userId, function () {
//   //       request
//   //         .get('/secret')
//   //         .set('Authorization', 'Bearer ' + accessToken)
//   //         .expect(401, done);
//   //     });
//   //   });
//   // });
// });
