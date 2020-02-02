// const fs = require('fs')
// const uploadFile = require('../modules/uploadFile')
// const insertSample = require('../modules/insertSample')
const moment = require('moment-timezone')
const base64url = require('base64url')
const makeTransfer = require('../modules/makeTransfer')
const verifyScope = require('../modules/verifyScope')
const getUserBalance = require('../modules/getUserBalance')
const getAccessToken = require('../modules/getAccessToken')
const generateOTP = require('../modules/generateOTP')
const saveOTP = require('../modules/saveOTP')
// const oauthServer = require('../modules/oauthCore')

module.exports = function (req, res) {
  moment().tz("Asia/Jakarta").format()
  // console.log(req.headers)
  if (req.headers.authorization.split(' ')[0] === 'Bearer') {
    getAccessToken(req.headers.authorization.split(' ')[1]).then(token => {
      if (token) {
        console.log(token)
        verifyScope(token,'make_transfer').then(result => {
          if (result) {
            var userAcc = {
              user_account: token.user.account
            }
            getUserBalance(userAcc).then(balance => {
              if (balance) {
                // console.log('balance', balance)
                if (Number(balance.balance) - req.body.amount > 500) {
                  makeTransfer(req.body.from,req.body.to,req.body.amount).then(transfer => {
                    // console.log(transfer)
                    generateOTP().then(otp => {
                      // console.log(otp)
                      var inputOTP = {
                        otp: otp,
                        otpExpiresAt: moment().add(1, 'm')
                      }
                      // console.log(inputOTP)
                      saveOTP(transfer.id,inputOTP).then(inputtedOTP => {
                        // console.log(inputtedOTP)
                        res.status(200).json({
                          msg: 'Please verify OTP',
                          transferId: inputtedOTP.reqTransfer.id
                        })
                      })
                      .catch(err => {
                        res.status(500).json({
                          msg: 'Internal Server Error'
                        })
                      })
                    })
                    .catch(err => {
                      // console.log(err)
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
                  res.status(200).json({
                    msg: 'Failed to Make Transfer'
                  })
                }
              }
            })
            .catch(err => {
              // console.log(err)
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
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    })
  }
}
