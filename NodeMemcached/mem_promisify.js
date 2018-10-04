let Memcached = require('memcached')
const MAX_EXPIRATION = 2592000

function Cache (config, options) {
  this.config = Object.assign({
    keyPrefix: '',
    cacheHost: 'localhost:11211'
  }, config)
  options = options || {}
  if (!options.hasOwnProperty('maxExpiration')) {
    options.maxExpiration = MAX_EXPIRATION
  }
  this.config.maxExpiration = options.maxExpiration
  if (!this.config.hideLogs) {
    console.log('creating memcached instance for cache host:', this.config.cacheHost)
  }
  this._cache = new Memcached(this.config.cacheHost, options)
}

function genericPromise (instance, method, ...args) {
  return new Promise((resolve, reject) => {
    instance._cache[method](...args, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

Cache.prototype.get = function (key) {
  return genericPromise(this, 'get', `${this.config.keyPrefix}${key}`)
}

Cache.prototype.utilGet = function (key) {
  return genericPromise(this, 'get', key)
}

Cache.prototype.getMulti = function (keys) {
  return genericPromise(this, 'getMulti', keys)
}

Cache.prototype.stats = function () {
  return genericPromise(this, 'stats')
}

Cache.prototype.set = function (key, data, expires) {
  if (expires > this.config.maxExpiration) {
    throw new Error('Cache.set: Expiration must be no greater than ' + this.config.maxExpiration + ' seconds.')
  }
  return genericPromise(this, 'set', this.config.keyPrefix + key, data, expires)
}

Cache.prototype.del = function (key) {
  return genericPromise(this, 'del', this.config.keyPrefix + key)
}

Cache.prototype.add = function (key, data, expires) {
  return genericPromise(this, 'add', this.config.keyPrefix + key, data, expires)
}

Cache.prototype.replace = function (key, data, expires) {
  return genericPromise(this, 'replace', this.config.keyPrefix + key, data, expires)
}

Cache.prototype.incr = function (key, value, expires) {
  return genericPromise(this, 'incr', this.config.keyPrefix + key, value)
}

Cache.prototype.desc = function (key, value, expires) {
  return genericPromise(this, 'desc', this.config.keyPrefix + key, value)
}

Cache.prototype.flush = function (key, data, expires) {
  return genericPromise(this, 'flush')
}

module.exports = Cache
