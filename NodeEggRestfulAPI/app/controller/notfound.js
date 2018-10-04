'use strict';

class ErrorController extends BaseController {
  async index() {
    this.ctx.body = '404 NOT FOUND!';
  }
}

module.exports = ErrorController;
