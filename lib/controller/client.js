"use strict";

var ClientModel = require('../client.js')
  , config = require('../../config/config')
  ;

var ClientController = function () { };

var authorizedClientIds = config.auth.authorizedClientIds;

ClientController.getClient = function (clientId, clientSecret, cb) {
  var params = { clientId: clientId };
  if (clientSecret !== null) {
    params.clientSecret = clientSecret;
  }
  ClientModel.findOne(params).exec().then(cb, cb);
};

ClientController.grantTypeAllowed = function (clientId, grantType, cb) {
  if (grantType === 'password') {
    return cb(false, authorizedClientIds.indexOf(clientId) >= 0);
  }

  cb(false, true);
};

module.exports = new ClientController();