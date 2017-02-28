'use strict'
const status = require('http-status')

module.exports = (app, repo) => {
  app.post('/publisher/find', async (req, res, next) => {
    try {
      const result = await repo.getPublisher(req.body.publisher)
      res.status(status.OK).json(result)
    } catch (e) {
      next(e)
    }
  })
}
