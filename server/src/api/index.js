const bookstoreAPI = require('./bookstore')
const authorAPI = require('./author')

module.exports = (app, repo) => {
  const {repo: bookRepo, authorRepo} = repo
  bookstoreAPI(app, bookRepo)
  authorAPI(app, authorRepo)
}
