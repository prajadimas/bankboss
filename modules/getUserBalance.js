const crypto = require('crypto')
const db = require('../config/db')

module.exports = function (user) {
  return new Promise((resolve, reject) => {
    console.log('user: ', user)
    console.log('using [QUERY]: SELECT balance FROM public.user WHERE user_account = \'' + user.user_account + '\' AND is_active = true')
    db.one('SELECT balance FROM public.user WHERE user_account = \'' + user.user_account + '\' AND is_active = true')
    .then(data => {
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
