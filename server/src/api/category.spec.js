/* eslint-env mocha */
const { createContainer, asValue } = require('awilix')
const should = require('should')
const request = require('supertest')
const server = require('../server/server')
const models = require('../models')
process.env.NODE = 'test'

describe('Category API', () => {
  let app = null

  const serverSettings = {
    port: 3000
  }

  let testRepo = {
    insertCategory (category) {
      return Promise.resolve(category)
    },
    getCategory (category) {
      const key = Object.keys(category)
      return Promise.resolve(key[0])
    }
  }

  beforeEach(() => {
    const container = createContainer()

    container.register({
      validate: asValue(models.validate),
      serverSettings: asValue(serverSettings),
      repo: asValue({}),
      categoryRepo: asValue(testRepo),
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

  it('can call get route', (done) => {
    const category = {}
    request(app)
      .post('/category/find')
      .send({category})
      .expect((res) => {
        // res.body.should.containEql('author')
        console.log(res.body)
      })
      .expect(200, done)
  })
})
