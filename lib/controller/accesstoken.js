"use strict";

var AccessTokenModel = require('../model/accesstoken')
  ;

var AccessTokenController = function () { };

AccessTokenController.prototype.getAccessToken = function (bearerToken, cb) {
  AccessTokenModel.findOne({ accessToken: bearerToken }).exec().then((accesstoken) => {
    cb(null, accesstoken);
  }, (err) => {
    cb(err, null);
  });
};

AccessTokenController.prototype.saveAccessToken = function (token, clientId, expires, userId, cb) {
  var fields = {
    clientId: clientId,
    userId: userId,
    expires: expires
  };

  AccessTokenModel.update({ accessToken: token }, fields, { upsert: true }).exec().then(() => {
    cb();
  },
    (err) => {
      if (err) {
        console.error(err);
      }

      cb(err);
    });
};

module.exports = new AccessTokenController();