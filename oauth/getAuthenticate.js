const base64url = require('base64url')

module.exports = function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.query)
  res.redirect('/oauth/login?user_account=' + req.query.user_account + '&client_id=' + base64url(req.query.client_id) + '&redirect_uri=' + encodeURI(req.query.redirect_uri) + '&response_type=' + req.query.response_type + '&grant_type=authorization_code')
}
