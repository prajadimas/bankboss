const { Router } = require('express')
const authorization = require('./authorization')
const exchangeToken = require('./exchangeToken')
const getAuthenticate = require('./getAuthenticate')
const getLoginPage = require('./getLoginPage')

const routes = Router()

routes.get('/authenticate', getAuthenticate)
routes.get('/login', getLoginPage)
routes.post('/authorize', authorization.authenticate, authorization.authorize)
routes.post('/token', exchangeToken)

module.exports = routes
