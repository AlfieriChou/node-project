const Memcached = require('memcached')
const memcached = new Memcached('127.0.0.1:11211')

memcached.set('foo', 'bar', 10, function (err) {
  if (err) throw new Error(err)
})

memcached.get('foo', function (err, data) {
  if (err) throw new Error(err)
  console.log(data)
})

memcached.end()
