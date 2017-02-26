/* eslint-env mocha */
const should = require('should')
const repository = require('./repository')
const di = require('../config')
const EventEmitter = require('events')
const mediator = new EventEmitter()
let test

describe('Repository', () => {
  before((done) => {
    mediator.on('di.ready', (container) => {
      container.cradle.database.collection('books').remove({}, (err, result) => {
        if (err) {
          console.log(err)
        }
        should.equal(result.result.ok, 1)
        repository.connect(container)
          .then(repo => {
            test = repo
            done()
          })
      })
    })

    di.init(mediator)

    mediator.emit('init')
  })

  it('can insert a book into the database', (done) => {
    const bookModel = {
      title: 'Build a nodejs cinema microservice',
      author: ['Cristian Ramirez Rosas'],
      publisher: 'medium',
      price: 200,
      isbn: '123abc456def7',
      cover: 'url',
      publication: new Date(),
      category: 'programming'
    }

    test.insertBook(bookModel)
      .then(result => {
        should.equal(Object.keys(result).includes('_id'), true)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('can find a books by many attributes from database', (done) => {
    const bookModel = {
      title: 'Build a nodejs cinema microservice',
      author: ['Cristian Ramirez Rosas'],
      price: {
        higher: true,
        number: 199
      }
    }

    test.findBook(bookModel)
      .then(result => {
        console.log(result)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
