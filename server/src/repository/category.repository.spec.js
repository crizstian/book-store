/* eslint-env mocha */
const should = require('should')
const repository = require('./category.repository')
const di = require('../config')
const EventEmitter = require('events')
const mediator = new EventEmitter()
let test

describe('Category Repository', () => {
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
      container.cradle.database.collection('category').remove({}, removesTestData)
    })

    di.init(mediator)

    mediator.emit('init')
  })

  after((done) => {
    test.disconnect()
    done()
  })

  it('can add category to the database', async () => {
    try {
      const category1 = {
        name: 'Database'
      }

      const category2 = {
        name: 'Programming'
      }

      const category3 = {
        name: 'Finance'
      }

      const category4 = {
        name: 'Selling'
      }

      // Example of using async/await ES8 specification
      const [result1, result2, result3, result4] = await Promise.all([
        test.insertCategory(category1),
        test.insertCategory(category2),
        test.insertCategory(category3),
        test.insertCategory(category4)
      ])
      should.equal(Object.keys(result1).includes('_id'), true)
      should.equal(Object.keys(result2).includes('_id'), true)
      should.equal(Object.keys(result3).includes('_id'), true)
      should.equal(Object.keys(result4).includes('_id'), true)
    } catch (e) {
      console.log(e)
    }
  })

  it('can get category from database', async () => {
    try {
      // Example of using async/await ES8 specification with promise.all
      const category = await test.getCategory({category: {}})
      category.should.be.instanceof(Array)
    } catch (e) {
      console.log(e)
    }
  })
})
