const mongoose = require('mongoose')
const kafkaThing = require('../utils/kafkaThing')


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


// pairSchema.post('findByIdAndUpdate', function(doc) {
//   console.log('update')

//   kafkaThing.send({
//     type: 'update',
//     pair: {
//       key: doc.key,
//       value: doc.value
//     }
//   })
// })

// pairSchema.post('save', function(doc) {
//   console.log('saving')
//   kafkaThing.send({
//     type: 'create',
//     pair: {
//       key: doc.key,
//       value: doc.value
//     }
//   })
// });

// pairSchema.post('remove', function(doc) {
//   kafkaThing.send({
//     type: 'remove',
//     pair: {
//       key: doc.key,
//       value: doc.value
//     }
//   })
// });

module.exports = mongoose.model('Pair', pairSchema)