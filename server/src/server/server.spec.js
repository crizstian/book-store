/* eslint-env mocha */
const { createContainer, asValue } = require('awilix')
const server = require('./server')

describe('Server', () => {
  it('should require a port to start', () => {
    const container = createContainer()

    container.register({
      serverSettings: asValue({}),
      repo: asValue({})
    })

    return server.start(container).should.be.rejectedWith(/port/)
  })
})
