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
module.exports = AccessTokenModel;