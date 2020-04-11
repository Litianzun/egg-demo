// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFollower = require('../../../app/model/follower');
import ExportNote = require('../../../app/model/note');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Follower: ReturnType<typeof ExportFollower>;
    Note: ReturnType<typeof ExportNote>;
    User: ReturnType<typeof ExportUser>;
  }
}
