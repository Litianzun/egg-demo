import {request} from '../utils';

export default {
  /**
   * 登录
   */
  login: urlPar => request('user/login', 'POST', urlPar),
  /**
   * 注册
   */
  register: urlPar => request('user', 'POST', urlPar),
  /**
   * 关注
   */
  follow: urlPar => request('user/following', 'POST', urlPar),
  /**
   * 取消关注
   */
  unfollow: urlPar => request(`user/following/${urlPar.id}`, 'DELETE', urlPar),
  /**
   * 关注列表
   */
  listFollow: urlPar => request('user/following/listfollowing', 'POST', urlPar),
  /**
   * 粉丝列表
   */
  listFans: urlPar => request('/user/following/listfans', 'POST', urlPar),
  /**
   * 查询用户
   */
  readUser: urlPar => request(`/user/${urlPar.id}`, 'GET', urlPar),
  /**
   * 修改用户
   */
  updateUser: urlPar => request(`/user/${urlPar.id}`, 'PATCH', urlPar),
};
