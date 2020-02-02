const crypto = require('crypto')

module.exports = function (client, user, scope) {
  return new Promise((resolve, reject) => {
    try {
      console.log('client: ', client)
      console.log('user: ', user)
      console.log('scope: ', scope)
      var token = crypto.createHash("sha256").update("token:" + user.id.toString() + ":" + new Date() + ":" + client.id.toString() + ":" + scope.toString()).digest("hex")
      console.log('access token: ', token)
      resolve(token)
    } catch (err) {
      reject(err)
    }
  })
}
