const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})
 
const producer = kafka.producer()
const group = Math.random().toString(36).substring(7)
const consumer = kafka.consumer({ groupId: group })
 
const run = async () => {
  // Producing
  await producer.connect()
 
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'pairs-topic', fromBeginning: true })
 
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      process(message.value)
      // console.log({
      //   partition,
      //   offset: message.offset,
      //   value: message.value.toString(),
      // })
    },
  })
}
 
run().catch(console.error)

async function process(msg) {
  // console.log(msg)
  msg = JSON.parse(msg)

  if (msg.group == group)
    return
    
  if (msg.type == 'create')
    processCreate(msg.pair)
  else if (msg.type == 'update')
    processUpdate(msg.pair)
  else if (msg.type == 'remove')
    processRemove(msg.pair)

}

async function processRemove(pair) {
  const Pair = require('../models/pair')

  console.log('remove ' + pair.key)
  const o = await Pair.findOne({key: pair.key})

  // TODO find by key
    await Pair.findByIdAndRemove(o._id)
}

async function processUpdate(pair) {
  const Pair = require('../models/pair')

  console.log('update ' + pair.key)
  const o = await Pair.findOne({key: pair.key})

  // const o = await Pair.findById(request.params.id)

  // TODO find by pair
    const updatedPair = await Pair.findByIdAndUpdate(o._id, pair, {new: true})
}

async function processCreate(pair) { 
  const Pair = require('../models/pair')

  console.log('create ' + pair.key)

    pair = new Pair(pair)
    
    await pair.save()
}


async function send(data) {
  console.log('--------------')
  console.log(JSON.stringify(data))
  data.group = group

  a = await producer.send({
    topic: 'pairs-topic',
    messages: [
      { value: JSON.stringify(data) },
    ],
  })
  console.log(a)
}

module.exports = { send }