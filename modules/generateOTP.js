// const moment = require('moment-timezone')
// const moment = require('moment')
const otpGen = require('otp-generator')

module.exports = function () {
  return new Promise((resolve, reject) => {
    try {
      var otp = (Math.floor(Math.random() * 9) + 1).toString()
      otp += otpGen.generate(5, { alphabets: false, upperCase: false, specialChars: false })
      console.log('OTP: ', otp)
      // moment().tz("Asia/Jakarta").format()
      // moment().format()
      // var expired = moment().add(1, 'm')
      resolve(otp)
    } catch (err) {
      reject(err)
    }
  })
}
