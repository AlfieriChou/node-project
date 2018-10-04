'use strict'

const { Service } = require('egg')

class BaseService extends Service {

  get name () {
    return _.snakeCase(this.constructor.name.replace(/service/i, ''))
  }

}

module.exports = BaseService