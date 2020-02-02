module.exports = function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.sendFile(__dirname + '/login.html')
  /* res.status(200).send({
    msg: 'API OK'
  }) */
}
