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

  app.post('/bookstore/find', async (req, res, next) => {
    try {
      const result = await repo.findBook(req.body.book)
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

  app.delete('/bookstore/:id', async (req, res, next) => {
    try {
      console.log(req.params.id);
      const result = await repo.deleteBook({id: req.params.id})
      res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  })
}
