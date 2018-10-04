const RSMQPromise = require('rsmq-promise')

const rsmq = new RSMQPromise({
  host: '127.0.0.1',
  port: 6379
})

const create = async () => {
  await rsmq.createQueue({qname: 'myqueue'})
  const result = await rsmq.sendMessage({qname: 'myqueue', message: 'Mr.wang love you'})
  console.log('------->', result)
  const haha = await rsmq.sendMessage({qname: 'myqueue', message: 'hahaha'})
  console.log('------->', haha)
}

create()
