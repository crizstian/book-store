'use strict'
const {EventEmitter} = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const authorRepository = require('./repository/author.repository')
const categoryRepository = require('./repository/category.repository')
const publisherRepository = require('./repository/publisher.repository')
const authRepository = require('./repository/auth.repository')
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
  const [repo, authorRepo, categoryRepo, publisherRepo, authRepo] = await Promise.all([
    repository.connect(container),
    authorRepository.connect(container),
    categoryRepository.connect(container),
    publisherRepository.connect(container),
    authRepository.connect(container)
  ])
  console.log('Connected. Starting Server')
  container.registerValue({repo})
  container.registerValue({authorRepo})
  container.registerValue({categoryRepo})
  container.registerValue({publisherRepo})
  container.registerValue({authRepo})

  const app = await server.start(container)
  console.log(`Server started succesfully, running on port: ${container.cradle.serverSettings.port}.`)

  app.on('close', () => {
    repo.disconnect()
  })
})

di.init(mediator)

mediator.emit('init')
