'use strict'
const {EventEmitter} = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const authorRepository = require('./repository/author.repository')
const di = require('./config')
const mediator = new EventEmitter()

console.log('--- Book Store Service ---')
console.log('Connecting to bookstore repository...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

mediator.on('di.ready', async (container) => {
  const [repo, authorRepo] = await Promise.all([
    repository.connect(container),
    authorRepository.connect(container)
  ])
  console.log('Connected. Starting Server')
  container.registerValue({repo})
  container.registerValue({authorRepo})

  const app = await server.start(container)
  console.log(`Server started succesfully, running on port: ${container.cradle.serverSettings.port}.`)

  app.on('close', () => {
    repo.disconnect()
  })
})

di.init(mediator)

mediator.emit('init')
