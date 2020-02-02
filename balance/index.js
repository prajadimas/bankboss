const { Router } = require('express')
const getBalance = require('./getBalance')

const routes = Router()

routes.get('/cek', getBalance)

module.exports = routes
