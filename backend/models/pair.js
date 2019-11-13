const mongoose = require('mongoose')


const pairSchema = mongoose.Schema({
  key: String,
  values: [
    {
      value: String
    }
  ]
})

pairSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Pair', pairSchema)