'use strict'
const status = require('http-status')

module.exports = (app, repo) => {
  app.post('/category/find', async (req, res, next) => {
    try {
      const result = await repo.getCategory(req.body.category)
      res.status(status.OK).json(result)
    } catch (e) {
      next(e)
    }
  })
}
