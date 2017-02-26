const authorSchema = (joi) => ({
  id: joi.string(),
  name: joi.string(),
  description: joi.string()
})

module.exports = authorSchema
