const bookstoreAPI = require('./bookstore')
const authorAPI = require('./author')
const categoryAPI = require('./category')
const publisherAPI = require('./publisher')

module.exports = (app, container) => {
  const {
    repo: bookRepo,
    authorRepo,
    categoryRepo,
    publisherRepo
  } = container.cradle

  bookstoreAPI(app, bookRepo)
  authorAPI(app, authorRepo)
  categoryAPI(app, categoryRepo)
  publisherAPI(app, publisherRepo)
}
