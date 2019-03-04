const dbSettings = {
  db: process.env.DB || 'bookstore',
  user: process.env.DB_USER || 'cris',
  pass: process.env.DB_PASS || 'bookstorepass1',
  server: process.env.DB_SERVER || '127.0.0.1:27017',
  get url () {
    return `mongodb://${this.server}/admin?w=1,j=true`
  }
}

const tokenSettings = {
  jwt: require('jwt-simple'),
  privateKey: '37LvDSm4XvjYOh9Y',
  tokenExpiry: 1 * 30 * 3000 * 60
}

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require('./ssl')
}

module.exports = Object.assign({}, { dbSettings, serverSettings, tokenSettings })
