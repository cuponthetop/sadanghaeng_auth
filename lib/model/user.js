"use strict";

var bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  , config = require('../../config/config')
  , uuid = require('uuid')
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

UserSchema.static('generateResetToken', function (email, cb) {
  this.findOne({ email: email }, function (err, user) {
    if (err || !user) {
      return cb(err);
    }
    var expireDate = new Date();
    expireDate.setDate(expireDate.getTime() + config.user.resetTokenLifetime);
    
    user.reset_token = uuid.v4();
    user.reset_token_expires = expireDate;

    user.save(cb);
  });
});

UserSchema.static('generateVerifyToken', function (email, cb) {
  this.findOne({ email: email }, function (err, user) {
    if (err || !user) {
      return cb(err);
    }
    
    if (user.verified) {
      return cb('user already verified oneself');
    }
    
    var expireDate = new Date();
    expireDate.setDate(expireDate.getTime() + config.user.verifyTokenLifetime);
    
    user.verify_token = uuid.v4();
    user.verify_token_expires = expireDate;

    user.save(cb);
  });
});

UserSchema.static('register', function (fields, cb) {
  var user;

  fields.hashed_password = hashPassword(fields.password);
  delete fields.password;

  // 학교 이메일 주소 체크 추가
  
  //

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
    
    if (user.verify_token_expires < new Date()) {
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
    
    if (user.reset_token_expires < new Date()) {
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