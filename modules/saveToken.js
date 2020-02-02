const db = require('../config/db')

module.exports = function (token, client, user) {
  return new Promise((resolve, reject) => {
    // console.log('token: ', token)
		// console.log('client: ', client)
    // console.log('user: ', user)
    console.log('using [QUERY]: INSERT INTO token(access_token,access_token_expires_at,client_id,user_id,scope) VALUES(\'' + token.accessToken + '\',\'' + token.accessTokenExpiresAt + '\',' + client.id + ',' + user.id + ',\'' + token.scope + '\') RETURNING access_token,access_token_expires_at,client_id,user_id,scope')
    db.one('INSERT INTO token(access_token,access_token_expires_at,client_id,user_id,scope) VALUES($1,$2,$3,$4,$5) RETURNING access_token,access_token_expires_at,client_id,user_id,scope', [token.accessToken,token.accessTokenExpiresAt,client.id,user.id,token.scope])
    .then(data => {
      var inputtedData = {
        accessToken: data.access_token,
        accessTokenExpiresAt: data.access_token_expires_at,
        scope: data.scope,
        client: {
          id: data.client_id
        },
        user: {
          id: data.user_id,
          account: user.account
        }
      }
      console.log('success [QUERY]: ', inputtedData) // print inputtedData
      resolve(inputtedData)
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
