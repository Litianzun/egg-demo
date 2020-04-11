// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFollower = require('../../../app/controller/follower');
import ExportHome = require('../../../app/controller/home');
import ExportNote = require('../../../app/controller/note');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    follower: ExportFollower;
    home: ExportHome;
    note: ExportNote;
    user: ExportUser;
  }
}
