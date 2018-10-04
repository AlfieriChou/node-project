module.exports = {
  knexConfig: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'test'
    },
    useNullAsDefault: true
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
}
