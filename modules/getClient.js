const crypto = require('crypto')
const db = require('../config/db')

module.exports = function (clientId, clientSecret) {
  return new Promise((resolve, reject) => {
    console.log('client_id: ', clientId)
    if (clientSecret) {
      console.log('client_secret: ', crypto.createHash("md5").update(clientSecret).digest("hex"))
      console.log('using [QUERY]: SELECT id,data_uris,grants FROM client WHERE client_id = \'' + clientId + '\' AND client_secret = \'' + crypto.createHash("md5").update(clientSecret).digest("hex") + '\' AND is_active = true')
      db.one('SELECT id,data_uris,grants FROM client WHERE client_id = \'' + clientId + '\' AND client_secret = \'' + crypto.createHash("md5").update(clientSecret).digest("hex") + '\' AND is_active = true')
      .then(result => {
        var data = {
          id: result.id,
          redirectUris: result.data_uris,
          grants: result.grants,
          accessTokenLifetime: 5 * 60
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
    } else {
      console.log('client_secret: null')
      console.log('using [QUERY]: SELECT id,data_uris,grants FROM client WHERE client_id = \'' + clientId + '\' AND is_active = true')
      db.one('SELECT id,data_uris,grants FROM client WHERE client_id = \'' + clientId + '\' AND is_active = true')
      .then(result => {
        var data = {
          id: result.id,
          redirectUris: result.data_uris,
          grants: result.grants,
          accessTokenLifetime: 5 * 60
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
    }
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
