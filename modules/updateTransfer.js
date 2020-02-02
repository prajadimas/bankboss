const db = require('../config/db')

module.exports = function (transferId) {
  return new Promise((resolve, reject) => {
    console.log('transferId: ', transferId)
    console.log('using [QUERY]: UPDATE transfer SET is_verified = true, is_success = true WHERE transfer.id = ' + transferId.toString())
    db.none('UPDATE transfer SET is_verified = true, is_success = true WHERE transfer.id = ' + Number(transferId))
    .then(() => {
      console.log('success [QUERY]: ') // print transfer_id that otp is revoked
      resolve(true)
    })
    .catch(error => {
      console.log('error [QUERY]: ', error) // print error
      reject(error)
    })
  })
}
