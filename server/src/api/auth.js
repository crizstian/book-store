'use strict'
const status = require('http-status')

module.exports = (app, repo) => {
  app.post('/signup', async (req, res, next) => {
    try {
      console.log(req.body.user)
      const result = await repo.createUser(req.body.user)
      res.status(status.OK).json({token: result})
    } catch (e) {
      next(e)
    }
  })

  app.post('/signin', async (req, res, next) => {
    try {
      const result = await repo.authenticateUser(req.body.user)
      res.status(status.OK).json({token: result})
    } catch (e) {
      next(e)
    }
  })
}
