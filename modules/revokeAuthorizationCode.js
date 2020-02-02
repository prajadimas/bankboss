const db = require('../config/db')

module.exports = function (code) {
  return new Promise((resolve, reject) => {
    // console.log('code: ', code)
    console.log('using [QUERY]: UPDATE authorizationcode SET is_active = false WHERE authorization_code = ' + code.code + ' RETURNING authorization_code')
    db.one('UPDATE authorizationcode SET is_active = false WHERE authorization_code = $1 RETURNING authorization_code', [code.code])
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
