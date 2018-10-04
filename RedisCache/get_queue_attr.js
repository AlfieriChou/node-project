const RSMQPromise = require('rsmq-promise')

const rsmq = new RSMQPromise({
  host: '127.0.0.1',
  port: 6379
})

const attr = async () => {
  const result = await rsmq.getQueueAttributes({qname: 'myqueue'})
  console.log('------>', result)
}

attr()