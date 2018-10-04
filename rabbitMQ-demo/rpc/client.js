const config = require('../config')
const jackrabbit = require('jackrabbit')
const rabbit = jackrabbit(config.url)
const exchange = rabbit.default()
const rpc = exchange.queue({ name: "rpc_queue", prefetch: 1, durable: false })

exchange.publish(
  { n: 40 },
  {
    key: "rpc_queue",
    reply: onReply
  }
)

function onReply(data) {
  console.log("result:", data.result)
  rabbit.close()
}
