"use strict";

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;
// 허용하는 클라이언트 아이디 (앱 별로 다름)
// 이거 컨피그로 빼던지 해야됨 
var authorizedClientIds = ['papers3', 'papers3-mac'];

var ClientSchema = new Schema({
  clientId: String,
  clientSecret: String,
  redirectUri: String
});

ClientSchema.static('getClient', function(clientId, clientSecret, cb) {
  var params = { clientId: clientId };
  if (clientSecret !== null) {
    params.clientSecret = clientSecret;
  }
  ClientModel.findOne(params, cb);
});

ClientSchema.static('grantTypeAllowed', function(clientId, grantType, cb) {
  if (grantType === 'password') {
    return cb(false, authorizedClientIds.indexOf(clientId) >= 0);
  }

  cb(false, true);
});

mongoose.model('clients', ClientSchema);
var ClientModel = mongoose.model('clients');
module.exports = ClientModel;
