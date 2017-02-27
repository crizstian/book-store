'use strict'
const {MongoClient} = require('mongodb')

const connect = (options, mediator) => {
  mediator.once('init.db', () => {
    MongoClient.connect(options.url, (err, db) => {
      if (err) {
        mediator.emit('db.error', err)
      }

      db.authenticate(options.user, options.pass, (err, result) => {
        if (err) {
          mediator.emit('db.error', err)
        }
        // after authentication we change to our db
        const bookstore = db.db(options.db)
        mediator.emit('db.ready', bookstore)
      })
    })
  })
}

module.exports = Object.assign({}, {connect})
