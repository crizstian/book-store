const bookstoreAPI = require('./bookstore')

module.exports = (app, repo) => {
  bookstoreAPI(app, repo)
}
