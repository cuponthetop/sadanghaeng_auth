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

var Client = require('../../lib/model/client');
var User = require('../../lib/model/user');
var Univ = require('../../lib/model/university');
var ClientData = require('./json/clients.json');
var UserData = require('./json/users.json');
var UnivData = require('./json/universitys.json');

function clearTestDb() {
  return Q.all([
    Client.remove({}),
    User.remove({}),
    Univ.remove({}),
  ]);
}

function insertTestDb() {
  return Q.all([
    Client.create(ClientData),
    User.create(UserData),
    Univ.create(UnivData),
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
