const config = require('../config')
const jackrabbit = require('jackrabbit')
const rabbit = jackrabbit(config.url)
const exchange = rabbit.default()
const rpc = exchange.queue({ name: "rpc_queue", prefetch: 1, durable: false })
rpc.consume(onRequest)

function onRequest(data, reply) {
  console.log("got request for n:", data.n)
  reply({ result: fib(data.n) })
}

function fib(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}