"use strict";

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;

var ClientSchema = new Schema({
  clientId: String,
  clientSecret: String,
  redirectUri: String
});

mongoose.model('clients', ClientSchema);
var ClientModel = mongoose.model('clients');
module.exports = ClientModel;
