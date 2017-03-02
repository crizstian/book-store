const serverSettings = {
  api_url: process.env.API || 'https://localhost:3000',
  port: process.env.PORT || 8080,
  ssl: require('./ssl')
}

module.exports = Object.assign({}, { serverSettings })
