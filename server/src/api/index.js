const bookstoreAPI = require('./bookstore')
const authorAPI = require('./author')
const categoryAPI = require('./category')
const publisherAPI = require('./publisher')
const authenticateAPI = require('./auth')

module.exports = (app, container) => {
  const {
    repo: bookRepo,
    authorRepo,
    categoryRepo,
    publisherRepo,
    authRepo
  } = container.cradle

  bookstoreAPI(app, bookRepo)
  authorAPI(app, authorRepo)
  categoryAPI(app, categoryRepo)
  publisherAPI(app, publisherRepo)
  authenticateAPI(app, authRepo)
}
