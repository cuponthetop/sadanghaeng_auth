"use strict";

var accessToken = require('../controller/accesstoken')
  , client = require('../controller/client')
  , refreshToken = require('../controller/refreshtoken')
  , user = require('../controller/user')
  ;


// node-oauth2-server API
module.exports.generateToken = function (type, req, cb) {
  if (type === 'accessToken') {
    accessToken.generateAccessToken(req, cb);
  } else if (type === 'refreshToken') {
    refreshToken.generateRefreshToken(req, cb);
  } else {
    cb('unknown error', null);
  }
};

module.exports.getAccessToken = accessToken.getAccessToken;
module.exports.saveAccessToken = accessToken.saveAccessToken;
module.exports.saveRefreshToken = refreshToken.saveRefreshToken;
module.exports.getRefreshToken = refreshToken.getRefreshToken;
module.exports.revokeRefreshToken = refreshToken.revokeRefreshToken;
module.exports.getUser = user.getUser;
module.exports.getClient = client.getClient;
module.exports.grantTypeAllowed = client.grantTypeAllowed;