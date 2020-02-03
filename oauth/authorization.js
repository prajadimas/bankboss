// const fs = require('fs')
// const uploadFile = require('../modules/uploadFile')
// const insertSample = require('../modules/insertSample')
const moment = require('moment-timezone')
const base64url = require('base64url')
const getUser = require('../modules/getUser')
const getClient = require('../modules/getClient')
const generateAuthorizationCode = require('../modules/generateAuthorizationCode')
const saveAuthorizationCode = require('../modules/saveAuthorizationCode')
// const oauthServer = require('../modules/oauthCore')

module.exports = {
  authenticate: function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
    res.setHeader('Access-Control-Allow-Origin', '*')
    console.log(req.body)
    getUser(req.body.user_account,req.body.password).then(user => {
      if (user) {
        return next()
      } else {
        res.status(404).json({
          msg: 'Not Found'
        })
      }
      // data ? next() : res.status(404).json({ msg: 'Not Found' })
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    })
  },
  authorize: function (req, res) {
    moment().tz("Asia/Jakarta").format()
    // console.log(req.body)
    getUser(req.body.user_account,req.body.password).then(user => {
      if (user) {
        getClient(base64url.decode(req.body.client_id),null).then(client => {
          if (client) {
            generateAuthorizationCode(client, user, 'make_transfer').then(authorizationCode => {
              var inputCode = {
                authorizationCode: authorizationCode,
                expiresAt: moment().add(5, 'm'),
                redirectUri: decodeURI(req.body.redirect_uri),
                scope: 'make_transfer'
              }
              saveAuthorizationCode(inputCode, client, user).then(code => {
                console.log(decodeURI(req.body.redirect_uri).toString() + '?code=' + base64url(code.authorizationCode) + '&expiresAt=' + base64url(moment(code.expiresAt).tz("Asia/Jakarta").format()) + '&user_account=' + base64url(code.user.account))
                res.redirect(decodeURI(req.body.redirect_uri) + '?code=' + base64url(code.authorizationCode) + '&expiresAt=' + base64url(moment(code.expiresAt).tz("Asia/Jakarta").format()) + '&user_account=' + base64url(code.user.account))
              })
              .catch(err => {
                console.log(err)
                res.status(500).json({
                  msg: 'Internal Server Error'
                })
              })
            })
            .catch(err => {
              res.status(500).json({
                msg: 'Internal Server Error'
              })
            })
          } else {
            res.status(404).json({
              msg: 'Not Found'
            })
          }
        })
      } else {
        res.status(404).json({
          msg: 'Not Found'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    })
  }
}
