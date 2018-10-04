import { Response } from '../common/Response'
import { knex, memcached } from '../config/index'

const index = async (req, res) => {
  const getValue = await memcached.get('users')
  if (getValue) {
    console.log('----------->', 1)
    return res.send(Response('查询成功', 1, getValue))
  } else {
    console.log('----------->', 2)
    const data = await knex('users').whereNull('deleted_at')
    await memcached.set('users', data, 100)
    const result = await memcached.get('users')
    res.json(Response('查询成功', 1, result))
  }
}

export {
  index
}
