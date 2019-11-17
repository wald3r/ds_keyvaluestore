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

module.exports = mongoose.model('Pair', pairSchema)