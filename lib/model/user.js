"use strict";

var bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;

var UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  password_reset_token: { type: String, unique: true },
  reset_token_expires: Date
});

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

UserSchema.static('register', function (fields, cb) {
  var user;

  fields.hashed_password = hashPassword(fields.password);
  delete fields.password;

  user = new UserModel(fields);
  user.save(cb);
});

UserSchema.static('getUser', function (email, password, cb) {
  UserModel.authenticate(email, password, function (err, user) {
    if (err || !user) return cb(err);
    cb(null, user.email);
  });
});

UserSchema.static('authenticate', function (email, password, cb) {
  this.findOne({ email: email }, function (err, user) {
    if (err || !user) return cb(err);
    cb(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
  });
});

mongoose.model('users', UserSchema);

var UserModel = mongoose.model('users');
module.exports = UserModel;