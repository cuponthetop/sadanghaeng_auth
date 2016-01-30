"use strict";

var express = require('express')
  , rateLimit = require('express-rate-limit')
  , v1 = require('./v1/auth')
  ;

var auth = express();

var limiter = rateLimit({ });

auth.use(limiter);

// auth.post('/authorise', function (req, res, next) {
//   if (!req.session.userId) {
//     return res.redirect('/session?redirect=' + req.path + 'client_id=' + 
//     req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
//   }
//   
//   next();
// }, auth.oauth.authCodeGrant(function (req, next) {
//   
//   // The first param should to indicate an error
//   // The second param should a bool to indicate if the user did authorise the app
//   // The third param should for the user/uid (only used for passing to saveAuthCode)
//   next(null, req.body.allow === 'yes', req.session.userId, null);
// }));

auth.use('/v1', v1);

auth.use(auth.oauth.errorHandler());

module.exports = auth;