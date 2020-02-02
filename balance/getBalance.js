const getUserBalance = require('../modules/getUserBalance')

module.exports = function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
  var user = {
    user_account: req.query.user_account + '' + req.query.phone_number
  }
  getUserBalance(user).then(data => {
    if (data) {
      // console.log(data.balance)
      var balanceInThousand = data.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      res.status(200).send('Rp ' + balanceInThousand + ',-')
    } else {
      res.status(404).json({
        msg: 'Not Found'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      msg: 'Internal Server Error'
    })
  })
  /* res.status(200).send({
    msg: 'API OK'
  }) */
}
