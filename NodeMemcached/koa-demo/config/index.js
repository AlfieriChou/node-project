import config from './config'
import Memcached from './mem_promisify'

const knex = require('knex')(config.knexConfig)
const port = process.env.PORT || 7000
const memcached = new Memcached()

export {
  port,
  knex,
  memcached
}
