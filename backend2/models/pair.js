const mongoose = require('mongoose')
var timestamps = require('mongoose-timestamp');

//a simple schema for a kv pair 
const pairSchema = mongoose.Schema({
  key: String,
  values: [
    {
      value: String
    }
  ]})

//add automatically timestamps
pairSchema.plugin(timestamps)

//change object id
pairSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Pair', pairSchema)
