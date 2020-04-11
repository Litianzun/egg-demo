# egg-demo
本项目采用的是阿里的egg.js框架，egg是一个用于企业级开发的渐进式框架，官网：<https://eggjs.org/zh-cn/>

后端：koa2 + mysql + sequelize，尽量符合Restful API风格，当前这些都是经过egg封装过的

前端：react-native + redux持久化，所有库采用最新版本，当前rn版本：0.61.5

_项目采用前后端分离开发，前端与后端需要分别运行命令_

>需要的环境
* node
* xcode
* 本地mysql

## 步骤

后端：

`cd egg-demo` 

`npm i` 

`npm run dev`，启动node本地服务

前端：

`cd client` 

`npm i` 

`yarn ios`，启动ios模拟器（需要下载xcode）

## 功能截图

>登录
<img src="http://q7w4bz19x.bkt.clouddn.com/image/egg1.gif" width="200px">

>首页
<img src="http://q7w4bz19x.bkt.clouddn.com/image/egg2.gif" width="200px">

>写日志
<img src="http://q7w4bz19x.bkt.clouddn.com/image/egg3.gif" width="200px">

>关注，取消关注
<img src="http://q7w4bz19x.bkt.clouddn.com/image/egg4.gif" width="200px">

>我的
<img src="http://q7w4bz19x.bkt.clouddn.com/image/egg5.gif" width="200px">

_项目中涉及大量图片，采用七牛云存储_ [^服务端代码]

[^服务端代码]: 下面为服务端代码，返回七牛上传凭证

```javascript
async qiniutoken() {
    try {
      const ctx = this.ctx;
      let mac = new qiniu.auth.digest.Mac(accessKey, secretKey); //鉴权对象
      let options = {
        scope: bucket,
        expires: 3600 * 24
      };
      let putPolicy = new qiniu.rs.PutPolicy(options);
      let uploadToken = putPolicy.uploadToken(mac);
      if (uploadToken) {
        ctx.body = JSON.stringify(uploadToken);
      } else {
        ctx.msg = "获取七牛token失败!";
      }
    } catch (error) {
      console.log(error);
    }
  }
 ```
