const {dbSettings, serverSettings, tokenSettings} = require('./config')
const database = require('./db')
const {initDI} = require('./di')
const models = require('../models')

const init = initDI.bind(null, {serverSettings, dbSettings, tokenSettings, database, models})

module.exports = Object.assign({}, {init})
