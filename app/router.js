'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  router.get('/user/:id',controller.user.readOne);
  router.post('/user/list',controller.user.list);
  router.post('/user/login',controller.user.login);
  router.post('/user',controller.user.create);
  router.patch('/user/:id',middleware.auth(),middleware.checkOwner(),controller.user.update);
  router.delete('/user/:id',middleware.auth(),middleware.checkOwner(),controller.user.delete);
  router.post('/user/following',middleware.auth(),controller.user.follow);
  router.delete('/user/following/:id',middleware.auth(),controller.user.unfollow);
  router.post('/user/following/listfollowing',controller.follower.listFollowing);
  router.post('/user/following/listfans',controller.follower.listFans);
};
