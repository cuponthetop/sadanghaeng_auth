"use strict";

var bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;

var UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  verified: { type: Boolean, required: true },
  reset_token: { type: String, unique: true },
  reset_token_expires: Date,
  verify_token: { type: String, unique: true },
  verify_token_expires: Date
});

var hashPassword = function (password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// var generateResetToken = function () {
  
// };

// var generateVerifyToken = function () {
  
// };

UserSchema.static('register', function (fields, cb) {
  var user;

  fields.hashed_password = hashPassword(fields.password);
  delete fields.password;

  user = new UserModel(fields);
  user.save(cb);
});

UserSchema.static('verifyUser', function (email, verifyToken, cb) {
  this.findOne({ email: email }, function (err, user) {
    if (err || !user) {
      return cb(err);
    }
    
    if (user.verified) {
      return cb('user already verified oneself');
    }
    
    if (user.verify_token !== verifyToken) {
      return cb('verification token mismatch');
    }
    
    if (user.verify_token_expires < 'currentTime') {
      return cb('verification token already expired');
    }
    
    delete user.verify_token;
    delete user.verify_token_expires;
    
    user.verify_token = true;
    
    user.save(cb);
  });
});

UserSchema.static('resetPassword', function (email, resetToken, newPassword, cb) {
  this.findOne({ email: email }, function (err, user) {
    if (err || !user) {
      return cb(err);
    }
    
    if (user.reset_token !== resetToken) {
      return cb('password reset token not matching');
    }
    
    if (user.reset_token_expires < 'currentTime') {
      return cb('password reset token already expired');
    }
    
    user.hashed_password = hashPassword(newPassword);
    
    delete user.reset_token;
    delete user.reset_token_expires;
    
    user.save(cb);
  });
});

UserSchema.static('authenticate', function (email, password, cb) {
  this.findOne({ email: email }, function (err, user) {
    if (err || !user) {
      return cb(err);
    }
    
    cb(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
  });
});

// Method for OAuth2

UserSchema.static('getUser', function (email, password, cb) {
  UserModel.authenticate(email, password, function (err, user) {
    if (err || !user) return cb(err);
    cb(null, user.email);
  });
});

mongoose.model('users', UserSchema);

var UserModel = mongoose.model('users');
module.exports = UserModel;