const RSMQPromise = require('rsmq-promise')

const rsmq = new RSMQPromise({
  host: '127.0.0.1',
  port: 6379
})

const list = async () => {
  await rsmq.createQueue({qname: 'alfieri'})
  const result = await rsmq.listQueues()
  console.log('-------->', result)
}

const pop = async () => {
  const data = await rsmq.popMessage({qname: 'myqueue'})
  console.log('------->', data)
}

list()