"use strict";

var express = require('express')
  , rateLimit = require('express-rate-limit')
  , v1 = require('./v1/auth')
  ;

var auth = express();

var limiter = rateLimit({ });

auth.use(limiter);

auth.use('/v1', v1);

module.exports = auth;