const publisherSchema = (joi) => ({
  id: joi.string(),
  name: joi.string(),
  description: joi.string()
})

module.exports = publisherSchema
