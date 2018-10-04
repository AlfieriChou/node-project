import { knex, memcached } from '../config/index'
import { Response } from '../common/Response'

const index = async (ctx) => {
  const getCache = await memcached.get('users')
  if (getCache) {
    console.log('----------->', 1)
    Response(ctx, 200, 1, '返回成功', getCache)
  } else {
    console.log('----------->', 2)
    const data = await knex('users').whereNull('deleted_at')
    await memcached.set('users', data, 100)
    const getCache = await memcached.get('users')
    Response(ctx, 200, 1, '返回成功', getCache)
  }
}

export {
  index
}
