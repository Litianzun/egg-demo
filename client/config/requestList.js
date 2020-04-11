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
  follow: (urlPar, token) => request('user/following', 'POST', urlPar, token),
  /**
   * 取消关注
   */
  unfollow: (urlPar, token) =>
    request(`user/unfollowing`, 'POST', urlPar, token),
  /**
   * 关注列表
   */
  listFollow: urlPar => request('user/following/listfollowing', 'POST', urlPar),
  /**
   * 粉丝列表
   */
  listFans: urlPar => request('user/following/listfans', 'POST', urlPar),
  /**
   * 查询用户
   */
  readUser: urlPar => request(`user/${urlPar.id}`, 'GET', urlPar),
  /**
   * 修改用户
   */
  updateUser: (urlPar, token) =>
    request(`user/${urlPar.id}`, 'PATCH', urlPar, token),
  /**
   * 获取七牛token
   */
  getQiniuToken: urlPar => request('qiniutoken', 'GET', urlPar),
  /**
   * 获取帖子列表
   */
  listNote: urlPar => request('note/list', 'POST', urlPar),
  /**
   * 新增帖子
   */
  createNote: urlPar => request('note', 'POST', urlPar),
  /**
   * 用户列表
   */
  listUser: urlPar => request('user/list', 'POST', urlPar),
};
