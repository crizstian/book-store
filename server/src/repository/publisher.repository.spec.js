/* eslint-env mocha */
const should = require('should')
const repository = require('./publisher.repository')
const di = require('../config')
const EventEmitter = require('events')
const mediator = new EventEmitter()
let test

describe('Publisher Repository', () => {
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
      container.cradle.database.collection('publisher').remove({}, removesTestData)
    })

    di.init(mediator)

    mediator.emit('init')
  })

  after((done) => {
    test.disconnect()
    done()
  })

  it('can add publisher to the database', async () => {
    try {
      const publisher1 = {
        name: "O'rilley",
        description: 'lorem ipsum'
      }

      const publisher2 = {
        name: 'Medium',
        description: 'lorem ipsum'
      }

      const publisher3 = {
        name: 'Alfa',
        description: 'lorem ipsum'
      }

      const publisher4 = {
        name: 'McGraw Hill',
        description: 'lorem ipsum'
      }

      // Example of using async/await ES8 specification
      const [result1, result2, result3, result4] = await Promise.all([
        test.insertPublisher(publisher1),
        test.insertPublisher(publisher2),
        test.insertPublisher(publisher3),
        test.insertPublisher(publisher4)
      ])
      should.equal(Object.keys(result1).includes('_id'), true)
      should.equal(Object.keys(result2).includes('_id'), true)
      should.equal(Object.keys(result3).includes('_id'), true)
      should.equal(Object.keys(result4).includes('_id'), true)
    } catch (e) {
      console.log(e)
    }
  })

  it('can get publisher from database', async () => {
    try {
      // Example of using async/await ES8 specification with promise.all
      const publishers = await test.getPublisher({publisher: {}})
      publishers.should.be.instanceof(Array)
    } catch (e) {
      console.log(e)
    }
  })
})
