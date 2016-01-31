"use strict";

var express = require('express')
  , oauth = require('oauth2-server')
  , oauthModel = require('../model/oauth')
  , User = require('../../model/user')
  , config = require('../../../config/config')
  ;

var auth = express();

auth.oauth = oauth({
  model: oauthModel ,
  grants: ['password', 'refresh_token'],
  accessTokenLifeTime: config.auth.accessTokenLifeTime,
  refreshTokenLifeTime: config.auth.refreshTokenLifeTime,
  authCodeLifeTime: config.auth.authCodeLifeTime,
  clientIdRegex: new RegExp('/^[a-z0-9-_]{3,40}$/i'),
  debug: config.auth.debug
});

auth.all('/token', auth.oauth.grant());

auth.post('/users/register', function (req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password
  };

  User.register(user, function (err, user) {
    if (err) return next(err);
    user = user;
    
    res.status(200).send();
  });
});

auth.get('/users/verify', function (req, res, next) {
  var email = req.user.email;

  User.generateVerifyToken(email, function (err, user) {
    if (err) return next(err);

    // send email 
    user = user;
    //
    res.status(200).send();
  });
});

auth.post('/users/verify', function (req, res, next) {

  next();
});

auth.get('/users/reset_password', function (req, res, next) {
  var email = req.user.email;

  User.generateResetToken(email, function (err, user) {
    if (err) return next(err);

    // send email 
    user = user;
    //
    res.status(200).send();
  });
});

auth.post('/users/reset_password', function (req, res, next) {

  next();
});

auth.post('/users/login', function (req, res, next) {

  next();
});

auth.post('/users/logout', function (req, res, next) {

  next();
});


auth.use(auth.oauth.errorHandler());

module.exports = auth;
