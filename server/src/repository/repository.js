'use strict'
const repository = (container) => {
  const {database: db, ObjectID: Id} = container.cradle

  const queryDocument = (options) => {
    const query = {}
    if ('id' in options) {
      query['_id'] = new Id(options.id)
    }
    if ('title' in options) {
      query['title'] = new RegExp(`.*${options.title}.*`, 'i')
    }
    if ('author' in options) {
      query['author'] = {
        $all: options.author
      }
    }
    if ('price' in options) {
      if ('lower' in options.price) {
        query['price'] = {
          $lte: parseFloat(options.price.number, 10)
        }
      } else if ('higher' in options.price) {
        query['price'] = {
          $gte: parseFloat(options.price.number, 10)
        }
      } else {
        query['price'] = options.price.number
      }
    }

    return query
  }

  const updateDocument = (options) => {
    const query = {
      $set: {}
    }

    for (const [key, value] of Object.entries(options)) {
      if (key !== 'id') {
        query['$set'][key] = value
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
          reject(new Error('An error occured fetching a book(s), err:' + err))
        }
        resolve(books)
      }
      cursor.sort({publication: -1})
      cursor.forEach(addBook, sendBooks)
    })
  }

  const updateBook = (book) => {
    return new Promise((resolve, reject) => {
      const query = queryDocument({id: book.id})
      const update = updateDocument(book)

      console.log(query);
      console.log(update);

      db.collection('books').update(query, update, (err, result) => {
        if (err) {
          reject(new Error(`An error occured when updating a book, err: ${err}`))
        }
        console.log(result.result)
        resolve(result.result)
      })
    })
  }

  const deleteBook = (book) => {
    return new Promise((resolve, reject) => {
      const query = queryDocument({id: book.id})

      db.collection('books').remove(query, (err, result) => {
        if (err) {
          reject(new Error(`An error occured when deleting a book, err: ${err}`))
        }
        resolve(result.result)
      })
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    insertBook,
    findBook,
    updateBook,
    deleteBook,
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
