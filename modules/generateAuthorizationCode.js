const moment = require('moment-timezone')
const crypto = require('crypto')

module.exports = function (client, user, scope) {
  return new Promise((resolve, reject) => {
    try {
      console.log('client: ', client)
      console.log('user: ', user)
      console.log('scope: ', scope)
      var code = crypto.createHash("sha256").update("code:" + user.id.toString() + ":" + new Date() + ":" + client.id.toString() + ":" + scope.toString()).digest("hex")
      console.log('authorization code: ', code)
      resolve(code)
    } catch (err) {
      reject(err)
    }
  })
}
