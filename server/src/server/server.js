const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyparser = require('body-parser')
const cors = require('cors')
const spdy = require('spdy')
const api = require('../api')

const start = (container) => {
  return new Promise((resolve, reject) => {
    const {serverSettings: {port, ssl}} = container.cradle

    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(bodyparser.json())
    app.use(cors())
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
      next()
    })
    app.use((req, res, next) => {
      req.container = container.createScope()
      next()
    })

    api(app, container)

    console.log(process.env.NODE)

    // if (process.env.NODE === 'test') {
      const server = app.listen(port, () => resolve(server))
    // } else {
    //   const server = spdy.createServer(ssl, app)
    //     .listen(port, () => resolve(server))
    // }
  })
}

module.exports = Object.assign({}, {start})
