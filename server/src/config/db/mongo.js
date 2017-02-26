'use strict'
const {MongoClient} = require('mongodb')

const connect = (options, mediator) => {
  mediator.once('init.db', () => {
    MongoClient.connect(options.url, (err, db) => {
      if (err) {
        mediator.emit('db.error', err)
      }

      db.admin().authenticate(options.user, options.pass, (err, result) => {
        if (err) {
          mediator.emit('db.error', err)
        }
        mediator.emit('db.ready', db)
      })
    })
  })
}

module.exports = Object.assign({}, {connect})
