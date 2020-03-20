// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth = require('../../../app/middleware/auth');
import ExportCheckOwner = require('../../../app/middleware/checkOwner');
import ExportJsonerror = require('../../../app/middleware/jsonerror');

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    checkOwner: typeof ExportCheckOwner;
    jsonerror: typeof ExportJsonerror;
  }
}
