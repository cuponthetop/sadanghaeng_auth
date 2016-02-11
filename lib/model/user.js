"use strict";

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;

var UserSchema = new Schema({

  email: { type: String, unique: true, required: true },
  nickname: { type: String, required: true },

  hashed_password: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
  admin: { type: Boolean, required: true, default: false },

  reset_token: { type: String },
  reset_token_expires: Date,
  verify_token: { type: String },
  verify_token_expires: Date,

  univID: { type: Schema.Types.ObjectId, required: true },
  memberSince: { type: Date, default: Date.now() },

  reportCounts: { type: Number, default: 0 }
});

mongoose.model('users', UserSchema);

var UserModel = mongoose.model('users');
module.exports = UserModel;
