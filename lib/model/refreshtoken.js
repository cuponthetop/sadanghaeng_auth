"use strict";

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var RefreshTokensSchema = new Schema({
  refreshToken: { type: String, required: true, unique: true },
  clientId: String,
  userId: { type: String, required: true },
  expires: Date
});

mongoose.model('refreshtokens', RefreshTokensSchema);

var RefreshTokenModel = mongoose.model('refreshtokens');

module.exports.saveRefreshToken = function(token, clientId, expires, userId, cb) {
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

module.exports.getRefreshToken = function(refreshToken, cb) {
  RefreshTokenModel.findOne({ refreshToken: refreshToken }, function(err, token) {
    // node-oauth2-server defaults to .user or { id: userId }, but { id: userId} doesn't work
    // This is in node-oauth2-server/lib/grant.js on line 256
    if (token) {
      token.user = token.userId;
    }
    cb(err, token);
  });
};