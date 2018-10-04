'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/signup', controller.user.signup);
  router.post('/login', controller.user.login);
  router.get('/users/:id', controller.user.getUser);
  router.put('/users/:id', controller.user.update);
  router.delete('/users/:id', controller.user.destroy);
  router.get('*', controller.notfound.index);
  router.post('*', controller.notfound.index);
  router.put('*', controller.notfound.index);
  router.delete('*', controller.notfound.index);

};
