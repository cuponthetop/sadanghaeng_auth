"use strict";

var RefreshTokenModel = require('../model/refreshtoken')
  , AccessTokenModel = require('../model/accesstoken')
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
  RefreshTokenModel.findOne({ refreshToken: refreshToken }).exec().then((token) => {
    // node-oauth2-server defaults to .user or { id: userId }, but { id: userId} doesn't work
    // This is in node-oauth2-server/lib/grant.js on line 256
    if (token) {
      token.user = token.userId.toString();
    }
    cb(null, token);
  }, (err) => {
    cb(err, null);
  });
};

RefreshTokenController.prototype.generateRefreshToken = function (req, cb) {
  RefreshTokenModel.findOne({ userId: req.user, expires: { $gte: new Date() } }).exec().then((token) => {
    cb(null, token);
  }, (err) => {
    cb(err);
  });
};

RefreshTokenController.prototype.revokeRefreshToken = function (token, cb) {
  // refresh token should be used only once,
  // after that, it should remove all its older ancestors including itself
  // and old already expired accesstokens
  RefreshTokenModel.findOneAndRemove({ refreshToken: token }).exec().then((removedToken) => {
    var clientId = removedToken.clientId;
    var userId = removedToken.userId;
    var datePivot = removedToken.expires;

    RefreshTokenModel.remove({ clientId: clientId, userId: userId, expires: { $lte: datePivot } }).exec().then(() => {
      AccessTokenModel.remove({ clientId: clientId, userId: userId, expires: { $lte: datePivot } }).exec().then(() => {
        cb(null);
      }, (err) => {
        cb(err);
      });
    }, (err) => {
      cb(err);
    });
  }, (err) => {
    cb(err);
  });
};

module.exports = new RefreshTokenController();