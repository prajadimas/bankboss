const moment = require('moment-timezone')
const db = require('../config/db')

module.exports = function (transferId, otp) {
  return new Promise((resolve, reject) => {
    console.log('transferId: ', transferId)
    console.log('using [QUERY]: SELECT transfer_id,otp,otp_expires_at FROM otpverificator WHERE transfer_id = \'' + transferId + '\' AND otp = \'' + otp + '\' AND otp_expires_at > \'' + moment().tz("Asia/Jakarta").format() + '\' AND is_used = false')
    db.one('SELECT transfer_id,otp,otp_expires_at FROM otpverificator WHERE transfer_id = \'' + transferId + '\' AND otp = \'' + otp + '\' AND otp_expires_at > \'' + moment().tz("Asia/Jakarta").format() + '\' AND is_used = false')
    .then(result => {
      var data = {
        reqTransfer: {
          id: result.transfer_id
        },
        otp: result.otp,
        otpExpiresAt: result.otp_expires_at
      }
      console.log('success [QUERY]: ') // success
      resolve(data)
    })
    .catch(error => {
      if (error.toString().includes('No data returned from the query')) {
        console.log('success [QUERY]: ') // success
        resolve(false)
      } else {
        console.log('error [QUERY]: ', error) // print error
        reject(error)
      }
    })
  })
	/*
	 *
	var tokens = config.tokens.filter(function (savedToken) {
		return savedToken.accessToken === accessToken
	})
	return tokens[0]
	 *
	 */
}
