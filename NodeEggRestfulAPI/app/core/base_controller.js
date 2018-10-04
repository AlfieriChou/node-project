'use strict'

const { Controller } = require('egg')

class BaseController extends Controller {
  get name () {
    return _.snakeCase(this.constructor.name.replace(/controller/i, ''))
  }

  get schema () {
    return this.app.schema
  }
}

module.exports = BaseController
