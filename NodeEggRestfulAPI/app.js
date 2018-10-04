'use strict'

const path = require('path')
const Joi = require('joi')

// load global variable
global.Joi = Joi.defaults(schema => {
  switch (schema.schemaType) {
    case 'string': return schema.allow('').trim()
    case 'number':
    case 'array':
    case 'date': return schema.allow(null)
    default: return schema
  }
})
global._ = require('lodash')
global.BaseController = require('./app/core/base_controller')
global.BaseService = require('./app/core/base_service')

// load to app
module.exports = app => {
  const directory = path.join(app.config.baseDir, 'app/schema')
  app.loader.loadToApp(directory, 'schema')
  // todo: 没找到knex为什么没有维持MySQL连接
  setInterval(function () {
    Promise.resolve(app.knex.raw('select 1'))
  }, 10 * 60000)
}