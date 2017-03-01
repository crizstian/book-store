'use strict'
const repository = (container) => {
  const {database: db} = container.cradle

  const insertAuthor = (author) => {
    return new Promise((resolve, reject) => {
      db.collection('authors').insert(author, (err, result) => {
        if (err) {
          reject(new Error(`An error occured when inserting an author, err: ${err}`))
        }
        resolve(result.ops[0])
      })
    })
  }

  const getAuthor = (author) => {
    return new Promise((resolve, reject) => {
      const authors = []

      const cursor = db.collection('authors').find(author)
      const addAuthor = (author) => {
        authors.push(author)
      }
      const sendAuthors = (err) => {
        if (err) {
          reject(new Error('An error occured fetching a book(s), err:' + err))
        }
        resolve(authors)
      }
      cursor.sort({name: 1})
      cursor.forEach(addAuthor, sendAuthors)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    insertAuthor,
    getAuthor,
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
