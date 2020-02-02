// server.js

// ==================== BASIC SERVER SETUP ====================== //
// ============================================================== //

// Packages needed
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
require('dotenv').config()

const oauth = require('./oauth/index')
const balance = require('./balance/index')
const transfer = require('./transfer/index')

var app = express()

// setting up port used
// const port = process.env.PORT || 80
const port = process.env.PORT || 8000

// All configurations goes here
/* Configuration of the body-parser to get data from POST requests */
app.use(bodyParser.json({limit: '1mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}))
/* Configuration of the helmet security */
app.use(helmet())

// ================== ROUTES FOR API REQUESTS =================== //
// ============================================================== //

app.get('/', function (req,res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send({
    msg: 'Welcome to Bank Boss API'
  })
})

// Register services
app.use('/oauth', oauth)
app.use('/balance', balance)
app.use('/transfer', transfer)

// ====================== SERVER STARTER ======================== //
// ============================================================== //

// listening server
app.listen(port, '0.0.0.0', () => {
	console.log(`API Bank Boss has started on port ${port}`)
})

// Export our app for testing purposes
module.exports = app
