/* eslint-env mocha */
const should = require('should')
const repository = require('./author.repository')
const di = require('../config')
const EventEmitter = require('events')
const mediator = new EventEmitter()
let test

describe('Author Repository', () => {
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
      container.cradle.database.collection('books').remove({}, removesTestData)
    })

    di.init(mediator)

    mediator.emit('init')
  })

  after((done) => {
    test.disconnect()
    done()
  })

  it('can insert a book into the database', async () => {
    try {


      const author1 = {
        name: 'Cristian Ramirez',
        age: 24,
        description: 'lorem ipsum'
      }

      const author2 = {
        name: 'Juan Diego Gomez',
        age: 38,
        description: 'lorem ipsum'
      }

      const author3 = {
        name: 'Jurgen Klarick',
        age: 42,
        description: 'lorem ipsum'
      }

      const author4 = {
        name: 'Eric Elliot',
        age: 40,
        description: 'lorem ipsum'
      }

      // Example of using async/await ES8 specification
      const [result1, result2, result3, result4] = await Promise.all([
        test.insertAuthor(author1),
        test.insertAuthor(author2),
        test.insertAuthor(author3),
        test.insertAuthor(author4)
      ])
      should.equal(Object.keys(result1).includes('_id'), true)
      should.equal(Object.keys(result2).includes('_id'), true)
      should.equal(Object.keys(result3).includes('_id'), true)
      should.equal(Object.keys(result4).includes('_id'), true)
      ids = [result1._id, result2._id, result3._id, result3._id]
    } catch (e) {
      console.log(e)
    }
  })

  it('can find books by many attributes from database', async () => {
    try {
      // Example of using async/await ES8 specification with promise.all
      const authors = await test.getAuthor({author: {}})
      authors.should.be.instanceof(Array)
    } catch (e) {
      console.log(e)
    }
  })
})
