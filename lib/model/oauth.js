"use strict";

var accessToken = require('./accesstoken')
  , client = require('./client')
  , refreshToken = require('./refreshtoken')
  , user = require('./user')
  ;


// node-oauth2-server API
module.exports.getAccessToken = accessToken.getAccessToken;
module.exports.saveAccessToken = accessToken.saveAccessToken;
module.exports.saveRefreshToken = refreshToken.saveRefreshToken;
module.exports.getRefreshToken = refreshToken.getRefreshToken;
module.exports.getUser = user.getUser;
module.exports.getClient = client.getClient;
module.exports.grantTypeAllowed = client.grantTypeAllowed;