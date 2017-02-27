const dbSettings = {
  db: process.env.DB || 'bookstore',
  user: process.env.DB_USER || 'cris',
  pass: process.env.DB_PASS || 'bookstorepass1',
  server: process.env.DB_SERVER || '192.168.99.100:27017',
  get url () {
    return `mongodb://${this.user}:${this.pass}@${this.server}/admin?w=1,j=true`
  }
}

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require('./ssl')
}

module.exports = Object.assign({}, { dbSettings, serverSettings })
