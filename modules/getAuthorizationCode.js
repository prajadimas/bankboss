const moment = require('moment-timezone')
const db = require('../config/db')

module.exports = function (authorizationCode, client) {
  return new Promise((resolve, reject) => {
    console.log('authorizationCode: ', authorizationCode)
    console.log('client: ', client)
    console.log('using [QUERY]: SELECT authorization_code,expires_at,redirect_uri,scope,client_id,public.user.id,public.user.user_account FROM authorizationcode JOIN public.user ON (authorizationcode.user_id = public.user.id) WHERE authorization_code = \'' + authorizationCode + '\' AND client_id = \'' + client.id + '\' AND redirect_uri = \'' + client.redirectUris + '\' AND expires_at > \'' + moment().tz("Asia/Jakarta").format() + '\' AND authorizationcode.is_active = true')
    db.one('SELECT authorization_code,expires_at,redirect_uri,scope,client_id,public.user.id,public.user.user_account FROM authorizationcode JOIN public.user ON (authorizationcode.user_id = public.user.id) WHERE authorization_code = \'' + authorizationCode + '\' AND client_id = \'' + client.id + '\' AND redirect_uri = \'' + client.redirectUris + '\' AND expires_at > \'' + moment().tz("Asia/Jakarta").format() + '\' AND authorizationcode.is_active = true')
    .then(result => {
      var data = {
        code: result.authorization_code,
        expiresAt: result.expires_at,
        redirectUri: result.redirect_uri,
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
}
