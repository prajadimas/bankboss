// const fs = require('fs')
// const uploadFile = require('../modules/uploadFile')
// const insertSample = require('../modules/insertSample')
const moment = require('moment-timezone')
const base64url = require('base64url')
const getUser = require('../modules/getUser')
const getClient = require('../modules/getClient')
const getAuthorizationCode = require('../modules/getAuthorizationCode')
const generateAccessToken = require('../modules/generateAccessToken')
const revokeAuthorizationCode = require('../modules/revokeAuthorizationCode')
const saveToken = require('../modules/saveToken')
// const oauthServer = require('../modules/oauthCore')

module.exports = function (req, res) {
  moment().tz("Asia/Jakarta").format()
  // console.log(req.body)
  getClient(req.body.client_id,req.body.client_secret).then(client => {
    if (client) {
      // console.log(client)
      getAuthorizationCode(base64url.decode(req.body.code),client).then(code => {
        if (code) {
          // console.log(code)
          revokeAuthorizationCode(code).then(result => {
            // console.log(result)
            if (result) {
              generateAccessToken(client, code.user, 'make_transfer').then(accessToken => {
                var inputToken = {
                  accessToken: accessToken,
                  accessTokenExpiresAt: moment().add(30, 'm'),
                  scope: 'make_transfer'
                }
                // console.log('inputToken: ', inputToken)
                saveToken(inputToken, client, code.user).then(token => {
                  console.log(token)
                  res.status(200).json({
                    access_token: token.accessToken,
                    token_type: 'Bearer',
                    expires_in: moment(token.accessTokenExpiresAt).diff(moment(),'s')
                  })
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
          .catch(err => {
            console.log(err)
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
      .catch(err => {
        console.log(err)
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
}
