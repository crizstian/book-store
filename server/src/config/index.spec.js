/* eslint-env mocha */
const {EventEmitter} = require('events')
const should = require('should')
const {init} = require('./')

describe('DI configuration', () => {
  it('can init dependencies to the container', (done) => {
    const mediator = new EventEmitter()

    mediator.on('di.ready', (container) => {
      should.ok(container)
      done()
    })

    mediator.on('di.error', err => {
      console.log(err)
      done()
    })

    init(mediator)

    mediator.emit('init')
  })
})
