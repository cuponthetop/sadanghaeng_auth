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
module.exports = RefreshTokenModel;