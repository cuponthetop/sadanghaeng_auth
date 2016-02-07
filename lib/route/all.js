"use strict";

var express = require('express')
  , v1 = require('./v1/auth')
  ;

var auth = express();

auth.use('/v1', v1);

module.exports = auth;