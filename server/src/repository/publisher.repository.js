'use strict'
const repository = (container) => {
  const {database: db} = container.cradle

  const insertPublisher = (publisher) => {
    return new Promise((resolve, reject) => {
      db.collection('publisher').insert(publisher, (err, result) => {
        if (err) {
          reject(new Error(`An error occured when inserting an publisher, err: ${err}`))
        }
        resolve(result.ops[0])
      })
    })
  }

  const getPublisher = (publisher) => {
    return new Promise((resolve, reject) => {
      const publishers = []

      const cursor = db.collection('publisher').find(publisher)
      const addPublisher = (publisher) => {
        publishers.push(publisher)
      }
      const sendPublishers = (err) => {
        if (err) {
          reject(new Error('An error occured fetching a publisher(s), err:' + err))
        }
        resolve(publishers)
      }
      cursor.forEach(addPublisher, sendPublishers)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    insertPublisher,
    getPublisher,
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
