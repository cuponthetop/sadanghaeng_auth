"use strict";

var express = require('express')
  , oauth = require('oauth2-server')
  , oauthModel = require('../model/oauth')
  , rateLimit = require('express-rate-limit')
  ;

var auth = express();

var limiter = rateLimit({ });

auth.use(limiter);

auth.oauth = oauth({
  model: oauthModel ,
  grants: ['password', 'refresh_token'],
  accessTokenLifeTime: 3600,
  refreshTokenLifeTime: 1209600,
  authCodeLifeTime: 30,
  clientIdRegex: '/^[a-z0-9-_]{3,40}$/i',
  debug: true
});

auth.all('/token', auth.oauth.grant());

auth.post('/authorise', function (req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/session?redirect=' + req.path + 'client_id=' + 
    req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
  }
  
  next();
}, auth.oauth.authCodeGrant(function (req, next) {
  
  // The first param should to indicate an error
  // The second param should a bool to indicate if the user did authorise the app
  // The third param should for the user/uid (only used for passing to saveAuthCode)
  next(null, req.body.allow === 'yes', req.session.userId, null);
}));

auth.post('/v1/users', function () {
  
});

auth.use(auth.oauth.errorHandler());

module.exports = auth;