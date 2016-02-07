"use strict";

process.env.NODE_ENV = 'test';

//npm module
var config = require('../../config/config');
var mongoose = require('mongoose');
var Q = require('q');

// 몽고 db 연결
var dbUri = config.db.uri + config.db.dbName;
var dbOptions = { username: config.db.username, password: config.db.password };
mongoose.connect(dbUri, dbOptions);

var AccessToken = require('../../lib/model/accesstoken');
var RefreshToken = require('../../lib/model/refreshtoken');

var Client = require('../../lib/model/client');
var User = require('../../lib/model/user');
var ClientData = require('./json/clients.json');
var UserData = require('./json/users.json');

function clearTestDb() {
  return Q.all([
    AccessToken.remote({}),
    RefreshToken.remove({}),
    Client.remove({}),
    User.remove({}),
  ]);
}

function insertTestDb() {
  return Q.all([
    Client.create(ClientData),
    User.create(UserData),
  ]);
}

Q.fcall(clearTestDb)
  .then(insertTestDb)
  .catch(function (error) {
    console.log(error);
  })
  .done(function () {
    process.exit(0);
  });
