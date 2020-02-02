const db = require('../config/db')

module.exports = function (transferId) {
  return new Promise((resolve, reject) => {
    // console.log('transfer_id: ', transfer_id)
    console.log('using [QUERY]: UPDATE otpverificator SET is_used = true WHERE transfer_id = ' + transferId.toString() + ' RETURNING transfer_id')
    // db.one('UPDATE sample SET is_active = false WHERE transfer_id = $1 RETURNING transfer_id', [transferId])
    db.one('UPDATE otpverificator SET is_used = true WHERE transfer_id = $1 RETURNING transfer_id', [transferId])
    .then(data => {
      console.log('success [QUERY]: ', data) // print transfer_id that otp is revoked
      resolve(true)
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
}
