"use strict";

var bcrypt = require('bcrypt')
  , Q = require('q')
  , UserModel = require('../model/user')
  ;

var UserController = function () { };

var authenticate = function (id, password) {
  var deferred = Q.defer();

  UserModel.findOne({ _id: id }).exec().then(function (user) {
    if (!user) {
      deferred.reject('user is not found');
    } else if (false === user.verified) {
      deferred.reject('user is not verified yet');
    } else if (bcrypt.compareSync(password, user.hashed_password) === true) {
      deferred.resolve(user);
    } else {
      deferred.reject('password is not matching');
    }
  }, function (err) {
    deferred.reject(err);
  });

  return deferred.promise;
};

// Method for OAuth2

UserController.prototype.getUser = function (id, password, cb) {
  authenticate(id, password).then(function (user) {
    if (!user) return cb('user is not found');
    cb(null, user._id.toString());
  }, function (err) {
    cb(err);
  });
};

module.exports = new UserController();