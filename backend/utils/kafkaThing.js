const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})
 
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: Math.random().toString(36).substring(7) })
 
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
  if (msg.type == 'create')
    processCreate(msg.pair)
  else if (msg.type == 'update')
    processUpdate(msg.pair)
  else if (msg.type == 'remove')
    processRemove(msg.pair)

}

async function processRemove(pair) {
  // TODO find by key
    await Pair.findByIdAndRemove(request.params.id)
}

async function processUpdate(pair) {
  // TODO find by pair
    const updatedPair = await Pair.findByIdAndUpdate(request.params.id, pair, {new: true})
}

async function processCreate(pair) { 
    pair = new Pair(pair)
    
    await pair.save()
}


async function send(data) {
  console.log('--------------')
  console.log(JSON.stringify(data))

  a = await producer.send({
    topic: 'pairs-topic',
    messages: [
      { value: JSON.stringify(data) },
    ],
  })
  console.log(a)
}

module.exports = { send }