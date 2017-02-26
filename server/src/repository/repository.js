'use strict'
const repository = (container) => {
  const {database: db, ObjectID: id} = container.cradle

  const queryDocument = (options) => {
    let query = {}
    if ('id' in options) {
      query['_id'] = new id(options.id)
    }
    if ('title' in options) {
      query['title'] = options.title
    }
    if ('author' in options) {
      query['author'] = { $all: options.author}
    }
    if ('price' in options) {
      if ('lower' in options.price) {
        query['price'] = { $lte: options.price.number}
      } else if ('higher' in options.price) {
        query['price'] = { $gte: options.price.number}
      } else {
        query['price'] = options.price.number
      }
    }

    return query
  }

  const insertBook = (book) => {
    return new Promise((resolve, reject) => {
      db.collection('books').insert(book, (err, result) => {
        if (err) {
          reject(new Error(`An error occured when inserting a book, err: ${err}`))
        }
        resolve(result.ops[0])
      })
    })
  }

  const findBook = (book) => {
    return new Promise((resolve, reject) => {
      const books = []
      const query = queryDocument(book)
      const cursor = db.collection('books').find(query)
      const addBook = (book) => {
        books.push(book)
      }
      const sendBooks = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all movies, err:' + err))
        }
        resolve(books)
      }
      cursor.forEach(addBook, sendBooks)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    insertBook,
    findBook,
    disconnect
  })
}

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve('database')) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(container))
  })
}

module.exports = Object.assign({}, {connect})
