const db = require('../config/db')

module.exports = function (code, client, user) {
  return new Promise((resolve, reject) => {
    // console.log('code: ', code)
		// console.log('client: ', client)
    // console.log('user: ', user)
    console.log('using [QUERY]: INSERT INTO authorizationcode(authorization_code,expires_at,redirect_uri,client_id,user_id,scope) VALUES(\'' + code.authorizationCode + '\',\'' + code.expiresAt + '\',\'' + code.redirectUri + '\',' + client.id + ',' + user.id + ',\'' + code.scope + '\') RETURNING authorization_code,expires_at,redirect_uri,client_id,user_id,scope')
    db.one('INSERT INTO authorizationcode(authorization_code,expires_at,redirect_uri,client_id,user_id,scope) VALUES($1,$2,$3,$4,$5,$6) RETURNING authorization_code,expires_at,redirect_uri,client_id,user_id,scope', [code.authorizationCode,code.expiresAt,code.redirectUri,client.id,user.id,code.scope])
    .then(data => {
      var inputtedData = {
        authorizationCode: data.authorization_code,
        expiresAt: data.expires_at,
        redirectUri: data.redirect_uri,
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
}
