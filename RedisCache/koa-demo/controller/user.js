import { knex, client, getAsync, hgetallAsync, lrangeAsync, smembersAsync } from '../config/index'
import { Response } from '../common/Response'
import {promisify} from 'util'

const index = async (ctx) => {
  const getData = await getAsync('users')
  if (getData) {
    console.log('------->', 1)
    Response(ctx, 200, 1, '返回成功', getData)
  } else {
    console.log('----------->', 2)
    const data = await knex('users').whereNull('deleted_at')
    await client.set('users', JSON.stringify(data))
    const result = await getAsync('users')
    Response(ctx, 200, 1, '返回成功', result)
  }
}

const show = async (ctx) => {
  const params = ctx.params
  const data = await hgetallAsync(params.id)
  if (data) {
    console.log('----------->', 1)
    Response(ctx, 200, 1, '返回成功', data)
  } else {
    console.log('-------->', 2)
    const users = await knex('users').where('_id', params.id).first()
    await client.hmset(params.id, 'id', users._id, 'phone', users.phone)
    const result = await hgetallAsync(params.id)
    Response(ctx, 200, 1, '返回成功', result)
  }
}

const list = async (ctx) => {
  const arr = [{id: 1,name: '王'},{id: 2,name: '军'},{id: 3,name: '牛'},{id: 4,name: '逼'}]
  const multi = client.multi()
  let i = 0
  while (i < arr.length) {
    multi.rpush('testlist', JSON.stringify(arr[i]))
    i++
  }
  const data = await lrangeAsync('testlist', 0, -1)
  const result = await multi.exec()
  Response(ctx, 200, 1, '返回成功', data)
}

const tags = async (ctx) => {
  const params = ['tags', 'angularjs', 'backbonejs', 'emberjs']
  const add = await client.sadd(params)
  const result = await smembersAsync('tags')
  Response(ctx, 200, 1, '返回成功', result)
}

export {
  index,
  show,
  list,
  tags
}
