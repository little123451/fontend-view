起步
---
1.安装
> **必须**
> 安装 node.js v4.4.4
> 通过 `npm install -g bower` 安装 `bower` 管理前端依赖
> 通过 `npm install -g gulp` 安装 `gulp` 进行项目构建
> 通过 `npm install` 安装 `npm` 依赖
> 通过 `bower install` 安装 `bower` 依赖
> 
> **可选**
> 通过 `npm install -g pm2` 安装 `pm2` 管理Node应用进程
> 通过 `npm install npm@lastest -g` 将 `npm` 更新到最新版本

2.启动
> 在命令行状态下进入到项目根目录
``` shell
gulp server
```

文件目录
----
```powershell
.
├── app.js
├── bin
│   ├── run.sh
│   └── www.js
├── bower.json           # 前端bower依赖
├── gulpfile.js          # 构建脚本
├── logs
├── node_modules         # node端第三方库
├── package.json         # node端npm依赖
├── public               # 存放构建后的静态文件
│   ├── images
│   ├── javascript
│   └── stylesheets
├── README.md
├── routes               # Node端逻辑
│   ├── index.js        # 处理展示相关页面逻辑的Router
│   └── users.js        # 处理用户相关页面逻辑的Router
├── src                  # 构建前的静态文件
│   ├── images
│   ├── javascript
│   ├── less
│   └── views
├── utils                # Node端工具类或函数
│   ├── api.js          # Node端链接PHP端interface的API接口封装
│   ├── log.js          # 日志记录类
│   ├── php.js          # 在Node中使用PHP函数的封装
│   └── postman.js      # Node端对于发送请求方法的封装
│   └── utils.js        # Node端工具类函数
└── views                # 存放构建后的Pug(Jade)文件

```

相关技术参考文档
---------------
**基础**
0. [NodeJS中文网](http://nodejs.cn/)
0. [NPM官网](https://www.npmjs.com)
0. [Jade语法参考文档](http://naltatis.github.io/jade-syntax-docs/)
0. [Less参考文档](http://lesscss.cn/)
0. [CommonJS和AMD规范](http://javascript.ruanyifeng.com/nodejs/module.html)

**常用库**
0. [Bootstrap参考文档](http://v3.bootcss.com/)
0. [RequireJS文档](http://www.requirejs.cn/)
0. [ECharts文档](http://echarts.baidu.com/examples.html)

**常用工具**
0. [pm2 : Node应用管理工具](https://www.npmjs.com/package/pm2)
0. [Bower前端包管理工具](https://bower.io/)
0. [Gulp前端构建工具](http://www.gulpjs.com.cn/)
0. [Browsersync浏览器同步测试工具](http://www.browsersync.cn/)

**扩展**
0. [Express-Session参考文档](https://www.npmjs.com/package/express-session)
0. [log4js参考文档](https://github.com/nomiddlename/log4js-node/wiki)
0. [Markdown语法参考文档](http://wowubuntu.com/markdown)
0. [Markdown在线编写](https://maxiang.io/)
0. [淘宝NPM镜像](https://npm.taobao.org/)
0. [Webpack模块化管理及打包工具](http://webpackdoc.com/)
0. [Vue前端MVVC框架](http://cn.vuejs.org/)
0. [React.js框架](http://reactjs.cn/react/docs/getting-started-zh-CN.html)
0. [Ant Design](https://ant.design/)