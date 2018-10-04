'use strict';

// had enabled by egg
// exports.static = true;

const path = require('path')

exports.joi = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-joi')
}

exports.knex = {
	enable: true,
	package: 'egg-knex'
}