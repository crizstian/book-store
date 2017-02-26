const {dbSettings, serverSettings} = require('./config')
const database = require('./db')
const models = require('../models')

const init = initDI.bind(null, {serverSettings, dbSettings, database, models})

module.exports = Object.assign({}, {init})
