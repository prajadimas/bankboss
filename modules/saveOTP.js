const db = require('../config/db')

module.exports = function (transferId, otp) {
  return new Promise((resolve, reject) => {
    // console.log('transfer_id: ', transfer_id)
    // console.log('otp: ', otp)
    console.log('using [QUERY]: INSERT INTO otpverificator(transfer_id,otp,otp_expires_at) VALUES(' + Number(transferId) + ',\'' + otp.otp + '\',\'' + otp.otpExpiresAt + '\') RETURNING transfer_id,otp,otp_expires_at')
    // db.one('INSERT INTO sample(transfer_id,otp,otp_expires_at) VALUES($1,$2,$3) RETURNING transfer_id,otp,otp_expires_at', [Number(transferId),otp.otp,otp.otpExpiresAt])
    db.one('INSERT INTO otpverificator(transfer_id,otp,otp_expires_at) VALUES($1,$2,$3) RETURNING transfer_id,otp,otp_expires_at', [Number(transferId),otp.otp,otp.otpExpiresAt])
    .then(data => {
      var inputtedData = {
        reqTransfer: {
          id: data.transfer_id
        },
        otp: data.otp,
        otpExpiresAt: data.otp_expires_at
      }
      console.log('success [QUERY]: ', inputtedData) // print inputtedData
      resolve(inputtedData)
    })
    .catch(error => {
      console.log('error [QUERY]: ', error) // print error
      reject(error)
    })
  })
}
