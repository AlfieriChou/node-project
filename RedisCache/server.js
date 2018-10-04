const asyncRedis = require('async-redis')
const client = asyncRedis.createClient({host: '118.24.62.50', port: 6389})

client.on('error', function (err) {
  console.log('Error ' + err)
})

const asyncBlock = async () => {
  await client.set('string key', 'string val')
  const value = await client.get('string key')
  console.log(value)
  await client.flushall('string key')
}

asyncBlock()
