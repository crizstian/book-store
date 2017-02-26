/* eslint-env mocha */
const should = require('should')
const {validate} = require('./')

describe('Schemas Validation', () => {
  it('can validate a book object', (done) => {
    const bookModel = {
      id: '1',
      title: 'Build a nodejs cinema microservice',
      author: ['Cristian Ramirez Rosas'],
      publisher: 'Medium',
      price: 200,
      isbn: '123abc456def7',
      cover: 'url',
      publication: new Date(),
      category: 'programming'
    }

    validate(bookModel, 'book')
      .then(value => {
        should.ok(value)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
