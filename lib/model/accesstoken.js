"use strict";

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;

var AccessTokenSchema = new Schema({
  accessToken: { type: String, required: true, unique: true },
  clientId: String,
  userId: { type: String, required: true },
  expires: Date
});

mongoose.model('accesstokens', AccessTokenSchema);

var AccessTokenModel = mongoose.model('accesstokens');

module.exports.getAccessToken = function(bearerToken, cb) {
  AccessTokenModel.findOne({ accessToken: bearerToken }, cb);
};

module.exports.saveAccessToken = function(token, clientId, expires, userId, cb) {
  var fields = {
    clientId: clientId,
    userId: userId,
    expires: expires
  };

  AccessTokenModel.update({ accessToken: token }, fields, { upsert: true }, function(err) {
    if (err) {
      console.error(err);
    }

    cb(err);
  });
};
