// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFollower = require('../../../app/service/follower');
import ExportTopic = require('../../../app/service/topic');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    follower: ExportFollower;
    topic: ExportTopic;
    user: ExportUser;
  }
}
