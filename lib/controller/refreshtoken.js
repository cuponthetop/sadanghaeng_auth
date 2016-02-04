"use strict";

var RefreshTokenModel = require('../model/refreshtoken')
    ;

var RefreshTokenController = function () { };


RefreshTokenController.prototype.saveRefreshToken = function (token, clientId, expires, userId, cb) {
  if (userId.id) {
    userId = userId.id;
  }

  var refreshToken = new RefreshTokenModel({
    refreshToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  refreshToken.save(cb);
};

RefreshTokenController.prototype.getRefreshToken = function (refreshToken, cb) {
  RefreshTokenModel.findOne({ refreshToken: refreshToken }).exec().then(function (token) {
    // node-oauth2-server defaults to .user or { id: userId }, but { id: userId} doesn't work
    // This is in node-oauth2-server/lib/grant.js on line 256
    if (token) {
      token.user = token.userId.toString();
    }
    cb(null, token);
  }, function (err) {
    cb(err, null);
  });
};

module.exports = new RefreshTokenController();