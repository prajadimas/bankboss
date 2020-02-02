const moment = require('moment-timezone')
const db = require('../config/db')

module.exports = function (accessToken) {
  return new Promise((resolve, reject) => {
    console.log('accessToken: ', accessToken)
    console.log('using [QUERY]: SELECT access_token,access_token_expires_at,scope,client_id,public.user.id,public.user.user_account FROM token JOIN public.user ON (token.user_id = public.user.id) WHERE access_token = \'' + accessToken + '\' AND access_token_expires_at > \'' + moment().tz("Asia/Jakarta").format() + '\'')
    db.one('SELECT access_token,access_token_expires_at,scope,client_id,public.user.id,public.user.user_account FROM token JOIN public.user ON (token.user_id = public.user.id) WHERE access_token = \'' + accessToken + '\' AND access_token_expires_at > \'' + moment().tz("Asia/Jakarta").format() + '\'')
    .then(result => {
      var data = {
        accessToken: result.access_token,
        accessTokenExpiresAt: result.access_token_expires_at,
        scope: result.scope,
        client: {
          id: result.client_id
        },
        user: {
          id: result.id,
          account: result.user_account
        }
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
	var tokens = config.tokens.filter(function (savedToken) {
		return savedToken.accessToken === accessToken
	})
	return tokens[0]
	 *
	 */
}
