# RedisCache
Redis cache handle in node.js

### 需要注意的问题

* Redis不能像memcached一样，直接将数组数据写入到value中，需要先转化成string
* Redis的get、hmgetall需要先封装成promise才能使用async/await。