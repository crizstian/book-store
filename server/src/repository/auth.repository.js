'use strict'
const moment = require('moment')

const repository = (container) => {
  const {database: db, tokenSettings:{privateKey, jwt}} = container.cradle

  const createUser = (user) => {
    return new Promise((resolve, reject) => {
      db.collection('users').insert(user, (err, result) => {
        if (err) {
          reject(new Error(`An error occured when inserting an author, err: ${err}`))
        }
        resolve(createToken(result.ops[0]))
      })
    })
  }

  const authenticateUser = (user) => {
    return new Promise((resolve, reject) => {
      const sendUserAuth = (err, auth) => {
        if (err) {
          reject(new Error(`An error occured fetching a movie with id: ${id}, err: ${err}`))
        }
        resolve(createToken(auth))
      }
      db.collection('users').findOne(user, sendUserAuth)
    })
  }

  const createToken = (user) => {
    const payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(6, "hours").unix(),
    };
    return jwt.encode(payload, privateKey)
  }

  const ensureAuthenticated = (req, res, next) => {
    if(!req.headers.authorization) {
      return res
        .status(status.FORBIDDEN)
        .send({message: "Tu petición no tiene cabecera de autorización"})
    }

    var token = req.headers.authorization.split(" ")[1]
    var payload = jwt.decode(token, privateKey)

    if(payload.exp <= moment().unix()) {
       return res
           .status(status.UNAUTHORIZED)
          .send({message: "El token ha expirado"})
    }

    req.user = payload.sub
    next()
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    createUser,
    authenticateUser,
    ensureAuthenticated,
    disconnect
  })
}

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve('database')) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(container))
  })
}

module.exports = Object.assign({}, {connect})
