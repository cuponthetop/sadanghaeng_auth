"use strict";

var ClientModel = require('../model/client')
  , config = require('../../config/config')
  ;

var ClientController = function () { };

var authorizedClientIds = config.auth.authorizedClientIds;

ClientController.prototype.getClient = (clientId, clientSecret, cb) => {
  var params = { clientId: clientId };
  if (clientSecret !== null) {
    params.clientSecret = clientSecret;
  }
  ClientModel.findOne(params).exec().then((client) => {
    cb(null, client);
  }, (err) => {
    cb(err, null);
  });
};

ClientController.prototype.grantTypeAllowed = (clientId, grantType, cb) => {
  if (grantType === 'password') {
    return cb(false, authorizedClientIds.indexOf(clientId) >= 0);
  }

  cb(false, true);
};

module.exports = new ClientController();