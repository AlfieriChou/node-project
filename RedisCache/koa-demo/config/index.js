import config from './config'
import redis from 'redis'
import {promisify} from 'util'

const knex = require('knex')(config.knexConfig)
const port = process.env.PORT || 7000
const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port
})

client.on('error', (err) => {
  if (err) throw new Error(err)
})

const getAsync = promisify(client.get).bind(client)
const hgetallAsync = promisify(client.hgetall).bind(client)
const lrangeAsync = promisify(client.lrange).bind(client)
const smembersAsync = promisify(client.smembers).bind(client)

export {
  port,
  knex,
  client,
  getAsync,
  hgetallAsync,
  lrangeAsync,
  smembersAsync
}
