'use strict'

const model = Joi.object({
  phone: Joi.string().description('用户名'),
  password: Joi.string().description('密码')
}).description('用户表')

const signup = {
  path: '/signup',
  method: 'post',
  requestBody: {
    body: ['phone','password'],
    require: ['phone', 'password']
  }
}

const login = {
  path: '/login',
  method: 'post',
  requestBody: {
    body: ['phone','password'],
    require: ['phone', 'password']
  }
}

const update = {
  method: 'put',
  path: '/users/{id}',
  parameters: {
    path: ['id']
  },
  requestBody: {
    body: ['password'],
    require: ['password']
  }
}

const destroy = {
  method: 'delete',
  path: '/users/{id}',
  parameters: {
    path: ['id']
  },
  summary: '删除用户'
}

module.export = {
  model,
  signup,
  login
}