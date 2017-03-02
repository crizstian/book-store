/* eslint-env mocha */
const { createContainer, asValue } = require('awilix')
const should = require('should')
const request = require('supertest')
const moment = require('moment')
const jwt = require('jwt-simple')
const server = require('../server/server')
const models = require('../models')
process.env.NODE = 'test'

describe('Authenticate API', () => {
  let app = null

  const serverSettings = {
    port: 3000
  }

  const tokenSettings = {
    jwt: require('jwt-simple'),
    privateKey: '37LvDSm4XvjYOh9Y'
  }

  let testRepo = {
    createUser (user) {
      return Promise.resolve(this.createToken(user))
    },
    authenticateUser (user) {
      return Promise.resolve(this.createToken(user))
    },
    createToken (user) {
      const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(6, "hours").unix(),
      };
      return tokenSettings.jwt.encode(payload, tokenSettings.privateKey)
    }
  }

  beforeEach(() => {
    const container = createContainer()

    container.register({
      validate: asValue(models.validate),
      serverSettings: asValue(serverSettings),
      tokenSettings: asValue(tokenSettings),
      repo: asValue({}),
      categoryRepo: asValue({}),
      publisherRepo: asValue({}),
      authorRepo: asValue({}),
      authRepo: asValue(testRepo)
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

  it('can call signin route', (done) => {
    const user = {
      user: 'cris',
      pass: '12345'
    }
    request(app)
      .post('/signin')
      .send({user})
      .expect((res) => {
        // res.body.should.containEql('author')
        console.log(res.body)
      })
      .expect(200, done)
  })

  it('can call signup route', (done) => {
    const user = {
      user: 'cris',
      pass: '12345'
    }
    request(app)
      .post('/signup')
      .send({user})
      .expect((res) => {
        // res.body.should.containEql('author')
        console.log(res.body)
      })
      .expect(200, done)
  })
})
