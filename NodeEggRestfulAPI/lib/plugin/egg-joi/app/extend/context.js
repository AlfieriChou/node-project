'use strict'

const Joi = require('joi')
const { enjoi, dejoi } = require('joi2json')

module.exports = {
  /**
   * validator
   * @param {*} rule validate rule
   * @param {*} action target action
   * @param {*} options extra option
   */
  validate (rule, action, options) {
    let jsonSchema = dejoi(rule)
    let result

    if (action.requestBody) {
      const payload = action.requestBody
      if (payload.required) jsonSchema.required = payload.required
      if (payload.body) {
        if (Array.isArray(payload.body)) {
          jsonSchema.properties = _.pick(jsonSchema.properties, payload.body)
          result = Joi.validate(this.request.body, enjoi(jsonSchema))
        } else {
          if (_.isPlainObject(payload.body)) payload.body = Joi.object().keys(payload.body)
          result = Joi.validate(this.request.body, payload.body)
        }
      } else {
        result = Joi.validate(this.request.body, rule)
      }
    } else {
      result = Joi.validate(this.request.body, rule)
    }

    if (result.error) this.throw(422, result.error.message)
    // attempts to cast values to the required types
    this.request.body = result.value
  }
}
