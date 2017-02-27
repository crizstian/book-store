/* eslint-env mocha */
const should = require('should')
const repository = require('./repository')
const di = require('../config')
const EventEmitter = require('events')
const mediator = new EventEmitter()
let test
let ids

describe('Repository', () => {
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
      const book1 = {
        title: 'How to deploy a mongodb replica set cluster using docker',
        author: ['Cristian Ramirez Rosas', 'MongoDB'],
        publisher: 'towardsDataScience',
        price: 250,
        isbn: '123abc456def7',
        cover: 'url',
        publication: new Date(),
        category: 'database'
      }

      const book2 = {
        title: 'Build a nodejs cinema microservice',
        author: ['Cristian Ramirez Rosas'],
        publisher: 'freeCodeCamp',
        price: 200,
        isbn: '891abc456def7',
        cover: 'url',
        publication: new Date(),
        category: 'programming'
      }

      const book3 = {
        title: 'Deploy nodejs microservices to a docker swarm cluster',
        author: ['Cristian Ramirez Rosas'],
        publisher: 'medium',
        price: 500,
        isbn: '123abc789def1',
        cover: 'url',
        publication: new Date(),
        category: 'devops'
      }

      // Example of using async/await ES8 specification
      const [result1, result2, result3] = await Promise.all([
        test.insertBook(book1),
        test.insertBook(book2),
        test.insertBook(book3)
      ])
      should.equal(Object.keys(result1).includes('_id'), true)
      should.equal(Object.keys(result2).includes('_id'), true)
      should.equal(Object.keys(result3).includes('_id'), true)
      ids = [result1._id, result2._id, result3._id]
    } catch (e) {
      console.log(e)
    }
  })

  it('can find books by many attributes from database', async () => {
    try {
      // can query a book by many attributes
      const manyAttr = {
        author: ['Cristian Ramirez Rosas'],
        price: {
          lower: true,
          number: 300
        }
      }

      // with one attribute
      const oneAttr = {
        id: ids[2]
      }

      // with none
      const noneAttr = {}

      // Example of using async/await ES8 specification with promise.all
      const [many, one, none] = await Promise.all([
        test.findBook(manyAttr),
        test.findBook(oneAttr),
        test.findBook(noneAttr)
      ])
      many.should.be.instanceof(Array).and.have.lengthOf(2)
      one.should.be.instanceof(Array).and.have.lengthOf(1)
      none.should.be.instanceof(Array).and.have.lengthOf(3)
    } catch (e) {
      console.log(e)
    }
  })

  it('can update a book', async () => {
    const update1 = {
      id: ids[0],
      title: 'Build a NodeJS cinema API Gateway and deploying it to Docker (part 4)',
      publisher: 'medium',
      price: 300
    }

    const update2 = {
      id: ids[1],
      author: ['Cristian Ramirez Rosas'],
      price: 375
    }

    const [result1, result2] = await Promise.all([
      test.updateBook(update1),
      test.updateBook(update2)
    ])

    should.equal(Object.keys(result1).includes('ok'), true)
    should.equal(Object.keys(result2).includes('ok'), true)
  })
})
