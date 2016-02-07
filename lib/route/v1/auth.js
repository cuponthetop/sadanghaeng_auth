"use strict";

var express = require('express')
  , oauth = require('oauth2-server')
  , oauthModel = require('../../model/oauth')
//  , User = require('../../model/user')
  , config = require('../../../config/config')
  ;

var auth = express();

auth.oauth = oauth({
  model: oauthModel ,
  grants: ['password', 'refresh_token'],
  accessTokenLifeTime: config.auth.accessTokenLifeTime,
  refreshTokenLifeTime: config.auth.refreshTokenLifeTime,
  authCodeLifeTime: config.auth.authCodeLifeTime,
  debug: config.auth.debug
});

auth.all('/token', auth.oauth.grant());

auth.all('/authorise', auth.oauth.authorise(), (req, res) => {
  res.status(200).json({ userId: req.user.id });
});

auth.use(auth.oauth.errorHandler());

module.exports = auth;
