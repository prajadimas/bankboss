'use strict'

// const db = require('../config/db')
require('dotenv').config()

/*
 *

var mariadbUser = process.env.MARIADB_USER
var mariadbPass = process.env.MARIADB_PASS
var mariadbPort = process.env.MARIADB_PORT
var mariadbName = process.env.MARIADB_NAME
var mariadbConf = {
  host: process.env.DB_HOST,
  user: mariadbUser,
  port: mariadbPort,
  password: mariadbPass,
  database: mariadbName
}
// console.log(mariadbConf)
module.exports = mariadbConf

 *
 */

var postgresUser = process.env.POSTGRES_USER
var postgresPass = process.env.POSTGRES_PASS
var postgresPort = process.env.POSTGRES_PORT
var postgresHost = process.env.POSTGRES_HOST
var postgresName = process.env.POSTGRES_NAME
var connectionString = 'postgres://' + postgresUser + ':' + postgresPass + '@' + postgresHost + ':' + postgresPort + '/' + postgresName
// console.log(connectionString)
var pgp = require('pg-promise')()
var postgresConf = pgp(connectionString)
// var postgresConf = pgp('postgres://lasti@103.122.5.98:51751/lastidb')
module.exports = postgresConf
