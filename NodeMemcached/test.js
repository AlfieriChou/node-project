const Memcached = require('./mem_promisify')
const memcached = new Memcached()

const setValue = async (key, value) => {
  const result = await memcached.set(key, value, 100)
  return result
}

const getValue = async (key) => {
  const result = await memcached.get(key)
  return result
}

const getData = async () => {
  await setValue('foo', 'bar', 10)
  const data = await getValue('foo')
  console.log(data)
  return data
}

getData()
