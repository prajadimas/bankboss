const db = require('../config/db')

module.exports = function (transferId) {
  return new Promise((resolve, reject) => {
    console.log('transferId: ', transferId)
    console.log('using [QUERY]: SELECT transfer.id,from_account,to_account,amount FROM transfer WHERE transfer.id = ' + transferId)
    db.one('SELECT transfer.id,from_account,to_account,amount FROM transfer WHERE transfer.id = ' + transferId)
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
	var tokens = config.tokens.filter(function (savedToken) {
		return savedToken.accessToken === accessToken
	})
	return tokens[0]
	 *
	 */
}
