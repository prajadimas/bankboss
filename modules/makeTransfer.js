const db = require('../config/db')

module.exports = function (from_account, to_account, amount) {
  return new Promise((resolve, reject) => {
    // console.log('from_account: ', from_account)
		// console.log('to_account: ', to_account)
    // console.log('amount: ', amount)
    console.log('using [QUERY]: INSERT INTO transfer(from_account,to_account,amount) VALUES(\'' + from_account + '\',\'' + to_account + '\',' + amount + ',) RETURNING id')
    db.one('INSERT INTO transfer(from_account,to_account,amount) VALUES($1,$2,$3) RETURNING id', [from_account,to_account,amount])
    .then(data => {
      console.log('success [QUERY]: ') // print inputtedData
      resolve(data)
    })
    .catch(error => {
      console.log('error [QUERY]: ', error) // print error
      reject(error)
    })
  })
  /*
   *
  token.client = {
		id: client.clientId
	}
	token.user = {
		username: user.username
	}
	config.tokens.push(token)
	return token
   *
   */
}
