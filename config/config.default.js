/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    mysql: {
      client: {
        database: "test",
        host: "localhost",
        port: 3306,
        user: "root",
        password: "ld6465455"
      },
      app: true,
      agent: false
    },
    sequelize: {
      dialect: "mysql",
      password: "ld6465455",
      host: "127.0.0.1",
      port: 3306,
      database: "test",
      timezone: "+8:00", // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
      dialectOptions: {
        // 让读取date类型数据时返回字符串而不是UTC时间
        dateStrings: true,
        typeCast(field, next) {
          if (field.type === "DATETIME") {
            return field.string();
          }
          return next();
        }
      }
    },
    security: {
      csrf: {
        enable: false
      }
    },
    jsonerror: {
      postFormat: (err, { stack, ...rest }) =>
        process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
    },
    validate: {
      //convert: false,
      //validateRoot: false
    }
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1573012504587_8306";

  // add your middleware config here
  config.middleware = ["jsonerror"];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
