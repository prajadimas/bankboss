const db = require('../config/db')

module.exports = function (from_account, to_account, amount) {
  return new Promise((resolve, reject) => {
    // console.log('from_account: ', from_account)
		// console.log('to_account: ', to_account)
    // console.log('amount: ', amount)
    console.log('using [QUERY]: UPDATE public.user SET balance = (balance + ' + amount + ') WHERE user_account = \'' + to_account + '\' AND is_active = true')
    db.none('UPDATE public.user SET balance = (balance + ' + amount + ') WHERE user_account = \'' + to_account + '\' AND is_active = true')
    .then(() => {
      console.log('success [QUERY]: Added Balance To Account ' + to_account) // print inputtedData
      console.log('using [QUERY]: UPDATE public.user SET balance = (balance - ' + amount + ') WHERE user_account = \'' + from_account + '\' AND is_active = true')
      db.none('UPDATE public.user SET balance = (balance - ' + amount + ') WHERE user_account = \'' + from_account + '\' AND is_active = true')
      .then(() => {
        console.log('success [QUERY]: Substract Balance To Account ' + from_account) // print inputtedData
        resolve(true)
      })
      .catch(error => {
        console.log('error [QUERY]: ', error) // print error
        reject(error)
      })
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
