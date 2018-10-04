const jackrabbit = require('jackrabbit')
const config = require('../config')
const rabbit = jackrabbit(config.url)
const exchange = rabbit.default()
const hello = exchange.queue({ name: "task_queue", durable: true })
hello.consume(onGreet)
function onGreet(data, ack) {
  console.log("Hola, " + data.name + "!")
  ack()
}