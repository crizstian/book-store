const bookSchema = (joi) => ({
  id: joi.string(),
  title: joi.string(),
  author: joi.array().items(joi.string()).single(),
  publisher: joi.string(),
  price: joi.number(),
  isbn: joi.string().alphanum().length(13),
  cover: joi.string(),
  publication: joi.date(),
  category: joi.string(),
  url: joi.string()
})

module.exports = bookSchema
