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

![egg1](http://q7w4bz19x.bkt.clouddn.com/image/egg1.gif)
