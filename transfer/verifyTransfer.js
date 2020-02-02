// const fs = require('fs')
// const uploadFile = require('../modules/uploadFile')
// const insertSample = require('../modules/insertSample')
const moment = require('moment-timezone')
const base64url = require('base64url')
const createTransfer = require('../modules/createTransfer')
const updateTransfer = require('../modules/updateTransfer')
const getTransferDetail = require('../modules/getTransferDetail')
const getOTP = require('../modules/getOTP')
const revokeOTP = require('../modules/revokeOTP')
// const oauthServer = require('../modules/oauthCore')

module.exports = function (req, res) {
  moment().tz("Asia/Jakarta").format()
  // console.log(req.body)
  getOTP(req.body.transfer_id,req.body.otp).then(otp => {
    if (otp) {
      // console.log(otp)
      revokeOTP(req.body.transfer_id).then(resRevokeOTP => {
        if (resRevokeOTP) {
          getTransferDetail(Number(req.body.transfer_id)).then(transfer => {
            if (transfer) {
              // console.log(transfer)
              createTransfer(transfer.from_account,transfer.to_account,Number(transfer.amount)).then(resTransfer => {
                if (resTransfer) {
                  // console.log(resTransfer)
                  updateTransfer(transfer.id).then(result => {
                    // console.log(result)
                    if (result) {
                      res.status(200).json({
                        msg: 'Successful Transfer from ' + transfer.from_account + ' to ' + transfer.to_account
                      })
                    } else {
                      res.status(404).json({
                        msg: 'Not Found'
                      })
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
