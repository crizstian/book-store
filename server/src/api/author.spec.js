/* eslint-env mocha */
const { createContainer, asValue } = require('awilix')
const should = require('should')
const request = require('supertest')
const server = require('../server/server')
const models = require('../models')
process.env.NODE = 'test'

describe('Author API', () => {
  let app = null

  const serverSettings = {
    port: 3000
  }

  let testRepo = {
    insertAuthor (auhtor) {
      return Promise.resolve(auhtor)
    },
    getAuthor (auhtor) {
      const key = Object.keys(auhtor)
      return Promise.resolve(key[0])
    }
  }

  beforeEach(() => {
    const container = createContainer()

    container.register({
      validate: asValue(models.validate),
      serverSettings: asValue(serverSettings),
      repo: asValue({}),
      categoryRepo: asValue({}),
      publisherRepo: asValue({}),
      authorRepo: asValue(testRepo),
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

  it('can call get route', (done) => {
    const author = {}
    request(app)
      .post('/author/find')
      .send({author})
      .expect((res) => {
        // res.body.should.containEql('author')
        console.log(res.body)
      })
      .expect(200, done)
  })
})
