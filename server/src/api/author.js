'use strict'
const status = require('http-status')

module.exports = (app, repo) => {
  app.post('/author/find', async (req, res, next) => {
    try {
      const result = await repo.getAuthor(req.body.author)
      res.status(status.OK).json(result)
    } catch (e) {
      next(e)
    }
  })
}
