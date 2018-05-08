起步
---
1.安装
> **必须**
>
> 安装 node.js v8.0.0 或以上，以获取 node 端的 ES6 语法支持
>
> 通过 `npm install -g gulp` 安装 `gulp` 进行项目构建
>
> 通过 `npm install` 安装 `npm` 依赖
> 
> **可选**
>
> 通过 `npm install -g pm2` 安装 `pm2` 管理Node应用进程
>
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
│   ├── api.js           # API-Router
│   └── index.js         # 页面Router
├── src                  # 构建前的静态文件
│   ├── images
│   ├── javascript
│   ├── less
│   └── views
├── utils                # Node端工具类或函数
│   ├── api.js          # Node端链接后端的API接口封装
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
1. [NPM官网](https://www.npmjs.com)
2. [Jade语法参考文档](http://naltatis.github.io/jade-syntax-docs/)
3. [Less参考文档](http://lesscss.cn/)
4. [CommonJS和AMD规范](http://javascript.ruanyifeng.com/nodejs/module.html)

**常用库**

0. [Bootstrap参考文档](http://v3.bootcss.com/)
1. [React.js框架](http://reactjs.cn/react/docs/getting-started-zh-CN.html)
2. [underscore.js工具类库](http://underscorejs.org/)

**常用工具**

0. [pm2 : Node应用管理工具](https://www.npmjs.com/package/pm2)
1. [Gulp前端构建工具](http://www.gulpjs.com.cn/)
2. [Browsersync浏览器同步测试工具](http://www.browsersync.cn/)

**扩展**

0. [Express-Session参考文档](https://www.npmjs.com/package/express-session)
1. [log4js参考文档](https://github.com/nomiddlename/log4js-node/wiki)
2. [Markdown语法参考文档](http://wowubuntu.com/markdown)
3. [Markdown在线编写](https://maxiang.io/)
4. [淘宝NPM镜像](https://npm.taobao.org/)
6. [Vue前端MVVC框架](http://cn.vuejs.org/)
7. [Browserify + Gulp + React](https://lincolnloop.com/blog/untangle-your-javascript-browserify/)
8. [配置你的 Gulp + Browserify](https://www.npmjs.com/package/gulp-browserify)
9. [Ant Design](https://ant.design/)

曾经使用过的工具或包
---------------
0. [Bower前端包管理工具](https://bower.io/)
> 在引入了 Browserify + Babel 后，可以直接通过如:  `import $ from 'jquery' ` 来引入前端包
>
> 于是前端包的管理也交给 npm，最终和 node 端用到的包一起记录到 `package.json` 中
>
> 这样的好处是包的引入相对 Bower 方便了一些
>
> 坏处是由于 Browserify 的处理，无法使用 公共CDN 加速一些前端包的加载
> 
> **根据项目需要，bower 用于管理前端样式库可能比较适合**

1. [RequireJS文档](http://www.requirejs.cn/)
> 初期通过 RequireJS 来实现JS模块化的功能
>
> 由于文档大部分为英文，再加上现在大部分框架或者工具已经将 require 方法做了实现
>
> 所以用 Gulp + Browserify 代替了这一模块

2. [Webpack模块化管理及打包工具](http://webpackdoc.com/)
> Webpack + React.js 是初期官方推荐的开发方法
>
> 由于Webpack 配置较为复杂，在静态文件的处理上没有 Gulp 方便，最后使用了两者组合的方案
>
> 后来了解到 Browserify 更为方便，便放弃了 Webpack

3. [ECharts文档](http://echarts.baidu.com/examples.html)
> ECharts是一个很棒的数据可视化JS库，该 repo 由实际项目转化而来，之前的项目中有使用过