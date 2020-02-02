const crypto = require('crypto')
const db = require('../config/db')

module.exports = function (username, password) {
  return new Promise((resolve, reject) => {
    console.log('user_account: ', username)
    console.log('password: ', crypto.createHash("md5").update(password).digest("hex"))
    console.log('using [QUERY]: SELECT id,user_account,balance,phone_number FROM public.user WHERE user_account = \'' + username + '\' AND password = \'' + crypto.createHash("md5").update(password).digest("hex") + '\' AND is_active = true')
    db.one('SELECT id,user_account,balance,phone_number FROM public.user WHERE user_account = \'' + username + '\' AND password = \'' + crypto.createHash("md5").update(password).digest("hex") + '\' AND is_active = true')
    .then(result => {
      var data = {
        id: result.id,
        account: result.user_account,
        balance: result.balance,
        phoneNumber: result.phone_number
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
  var clients = config.clients.filter(function (client) {
		return client.clientId === clientId && client.clientSecret === clientSecret
	})
	var confidentialClients = config.confidentialClients.filter(function (client) {
		return client.clientId === clientId && client.clientSecret === clientSecret
	})
	return clients[0] || confidentialClients[0]
   *
   */
}
