const { Router } = require('express')
const transfer = require('./transfer')
const verifyTransfer = require('./verifyTransfer')

const routes = Router()

routes.post('/balance', transfer)
routes.post('/verify', verifyTransfer)

module.exports = routes
