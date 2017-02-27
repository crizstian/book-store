/* eslint-env mocha */
const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

describe('Book Store Service', () => {
  const url = 'https://localhost:3000'
  let id

  it('can post a book in the bookstore system', (done) => {
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    const book = {
      title: 'How to deploy a mongodb replica set cluster using docker',
      author: ['Cristian Ramirez Rosas', 'MongoDB'],
      publisher: 'towardsDataScience',
      price: 250,
      isbn: '123abc456def7',
      cover: 'url',
      publication: new Date(),
      category: 'database'
    }

    api.post('/bookstore')
      .send({book})
      .expect((res) => {
        id = res.body._id
      })
      .expect(200, done)
  })

  it('can get a book from the bookstore system', (done) => {
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    const book = {
      author: ['Cristian Ramirez Rosas'],
      price: {
        lower: true,
        number: 300
      }
    }

    api.get('/bookstore')
      .send({book})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })

  it('can update a book in the bookstore system', (done) => {
    const url = 'https://localhost:3000'
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    const book = {
      id,
      price: 400,
      category: 'devops'
    }

    api.put('/bookstore')
      .send({book})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })

  it('can delete a book from the bookstore system', (done) => {
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    const book = {
      id
    }

    api.delete('/bookstore')
      .send({book})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
