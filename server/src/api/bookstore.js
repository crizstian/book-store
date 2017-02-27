'use strict'
const status = require('http-status')

module.exports = (app, repo) => {
  app.post('/bookstore', async (req, res, next) => {
    try {
      const {validate} = req.container.cradle
      const book = await validate(req.body.book, 'book')
      const result = await repo.insertBook(book)
      res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  })

  app.get('/bookstore', async (req, res, next) => {
    try {
      const book = (req.body.book) ? req.body.book : {}
      const result = await repo.findBook(book)
      res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  })

  app.put('/bookstore', async (req, res, next) => {
    try {
      const {validate} = req.container.cradle
      const book = await validate(req.body.book, 'book')
      const result = await repo.updateBook(book)
      res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  })

  app.delete('/bookstore', async (req, res, next) => {
    try {
      const result = await repo.deleteBook(req.body.book)
      res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  })
}
