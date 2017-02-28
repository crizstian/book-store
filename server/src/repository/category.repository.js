'use strict'
const repository = (container) => {
  const {database: db} = container.cradle

  const insertCategory = (category) => {
    return new Promise((resolve, reject) => {
      db.collection('category').insert(category, (err, result) => {
        if (err) {
          reject(new Error(`An error occured when inserting an category, err: ${err}`))
        }
        resolve(result.ops[0])
      })
    })
  }

  const getCategory = (category) => {
    return new Promise((resolve, reject) => {
      const categories = []

      const cursor = db.collection('category').find(category)
      const addCategory = (category) => {
        categories.push(category)
      }
      const sendCategories = (err) => {
        if (err) {
          reject(new Error('An error occured fetching a categories(s), err:' + err))
        }
        resolve(categories)
      }
      cursor.forEach(addCategory, sendCategories)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    insertCategory,
    getCategory,
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
