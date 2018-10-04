'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521523089004_7250';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => isInnerIp(ctx.ip)
    },
  }

  config.knex = {
    client: {
      dialect: 'mysql',
      connection: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'test',
        supportBigNumbers: true,
        charset: 'utf8mb4',
        connectTimeout: 15000
      },
      pool: { min: 2, max: 10 }
    },
    app: true,
    agent: false
  }

  return config;
};
