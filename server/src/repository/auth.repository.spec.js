/* eslint-env mocha */
const should = require('should')
const repository = require('./auth.repository')
const di = require('../config')
const EventEmitter = require('events')
const mediator = new EventEmitter()
let test

describe('Authenticate Repository', () => {
  // example of using the promise based specification
  before('connects the repository with the db', (done) => {
    mediator.on('di.ready', (container) => {
      const removesTestData = (err, result) => {
        if (err) {
          throw new Error(err)
        }
        should.equal(result.result.ok, 1)
        repository.connect(container)
          .then(repo => {
            test = repo
            done()
          })
          .catch(err => {
            console.log(err)
            done()
          })
      }
      container.cradle.database.collection('users').remove({}, removesTestData)
    })

    di.init(mediator)

    mediator.emit('init')
  })

  after((done) => {
    test.disconnect()
    done()
  })

  it('can add users to the database', async () => {
    try {
      const user1 = {
        user: 'cristiano@email.com',
        pass: '12345'
      }

      // Example of using async/await ES8 specification
      const result1 = await test.insertUser(user1)
      should.equal(Object.keys(result1).includes('token'), true)
    } catch (e) {
      console.log(e)
    }
  })

  it('can get authenticate from database', async () => {
    try {
      const user1 = {
        user: 'cristiano@email.com',
        pass: '12345'
      }
      // Example of using async/await ES8 specification with promise.all
      const user = await test.authenticateUser(user1)
      should.equal(Object.keys(user).includes('token'), true)
    } catch (e) {
      console.log(e)
    }
  })
})
