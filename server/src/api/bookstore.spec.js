/* eslint-env mocha */
const { createContainer, asValue } = require('awilix')
const should = require('should')
const request = require('supertest')
const server = require('../server/server')
const models = require('../models')
process.env.NODE = 'test'

describe('Book Store API', () => {
  let app = null

  const serverSettings = {
    port: 3000
  }

  let testRepo = {
    insertBook (book) {
      return Promise.resolve(book)
    },
    findBook (book) {
      const key = Object.keys(book)
      return Promise.resolve(key[0])
    },
    updateBook (book) {
      const keys = Object.keys(book)
      return Promise.resolve(keys)
    },
    deleteBook (book) {
      return Object.keys(book).includes('id') ? Promise.resolve(1) : Promise.reject(2)
    }
  }

  beforeEach(() => {
    const container = createContainer()

    container.register({
      validate: asValue(models.validate),
      serverSettings: asValue(serverSettings),
      repo: asValue(testRepo),
      categoryRepo: asValue({}),
      publisherRepo: asValue({}),
      authorRepo: asValue({}),
      authRepo: asValue({})
    })

    return server.start(container)
      .then(serv => {
        app = serv
      })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can call post route', (done) => {
    const book = {
      title: 'How to deploy a mongodb replica set cluster using docker',
      author: ['Cristian Ramirez Rosas', 'MongoDB'],
      publisher: 'towardsDataScience',
      price: 250,
      isbn: '123abc456def7',
      cover: 'url',
      category: 'database'
    }

    request(app)
      .post('/bookstore')
      .send({book})
      .expect((res) => {
        res.body.should.containEql(book)
      })
      .expect(200, done)
  })

  it('can get books', (done) => {
    const book = {
      author: ['Cristian Ramirez Rosas'],
      price: {
        lower: true,
        number: 300
      }
    }
    request(app)
      .post('/bookstore/find')
      .send({book})
      .expect((res) => {
        res.body.should.containEql('author')
      })
      .expect(200, done)
  })

  it('can call put route', (done) => {
    const book = {
      author: ['Cristian Ramirez Rosas'],
      price: 300
    }

    request(app)
      .put('/bookstore')
      .send({book})
      .expect((res) => {
        res.body.should.be.instanceof(Array).and.have.lengthOf(2)
      })
      .expect(200, done)
  })

  it('can call delete route', (done) => {
    request(app)
      .delete('/bookstore/1')
      .expect((res) => {
        res.body.should.equal(1)
      })
      .expect(200, done)
  })
})
