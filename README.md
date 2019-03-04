Frontend - 学习、构建和编写Web前端页面
=========================

起步
---
1.安装
> **必须**
>
> 安装 node.js v8.0.0 或以上，以获取 node 端的 ES6 语法支持
>
> 通过 `yarn global add gulp` 安装 `gulp` 进行项目构建
>
> 通过 `yarn` 安装依赖
> 
> **可选**
>
> 通过 `yarn global add pm2` 安装 `pm2` 管理Node应用进程

2.启动测试服务
> 在命令行状态下进入到项目根目录
``` shell
gulp server
```

3.样例路由
```shell
/index              默认首页
/wechat/index       微信公众号网页开发样例
/api/index          Node端接口样例
/index/bootstrap    React-Bootstrap页面样例
/index/vue          Vue学习样例界面
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
├── routes               # Node端路由逻辑
│   ├── api.js          # API路由
│   ├── index.js        # 页面路由
├── src                  # 构建前的静态文件
│   ├── images
│   ├── javascript
│   ├── less
│   └── views
├── utils                # Node端工具类或函数
│   ├── api.js          # 简易API接口封装
│   ├── log.js          # 日志记录类
│   ├── request.js      # HTTP请求类
│   └── utils.js        # 工具函数
└── views                # 存放构建后的Pug(Jade)文件

```

Socket 协议参考
---------------
**请求参数（页端向服务端发起）**

| 参数名称 | 类型 | 描述 |
| --- |  --- | --- |
| id |  String | 请求唯一id，由客户端生成，无特定规则，只要能唯一标识请求即可 |
| reqType |  String | 请求类型. **req** 表示单次请求，**sub** 表示订阅某类数据 |
| api |  String | socket 接口 api, 对比 RESTful 中 URL 的 PATH |
| data |  Object | 接口请求数据 |

**返回参数（服务端向页端返回）**

| 参数名称 | 是否必返回 | 类型 | 描述 |
| --- | --- | --- | --- |
| id | false | String | 当请求类型为req时返回，对应请求中的id |
| api | true | String | 对应请求中的api |
| dataId | false | String | 当信息为订阅信息时返回，表示订阅的数据结构标识 |
| reqType | true | String | 对应请求中的reqType |
| code | true | int | 状态码，0:成功 |
| msg | false | String | 状态码描述信息 |
| data | false | String | 返回的数据 |

**订阅**
``` json
# ①
# 订阅请求（页端发起）
{
	id: '4415297e3af8c',
	reqType: 'sub',
	api: 'socket/v1/example',
	data: {
		reqData: 'subscribe data'
	}
}

# ②
# 订阅请求返回（服务端确认收到订阅请求）
# 只有订阅的确认返回里面同时具有 id 和 dataId 字段
{
	id: '4415297e3af8c',
	reqType: 'sub',
	api: 'socket/v1/example',
	dataId: '5c7c92c1d2d8e',
	code: 0
}

# ③
# 订阅数据返回（页端收到的服务端推送订阅数据）
{
	api: 'socket/v1/example',
	reqType: 'sub',
	dataId: '5c7c92c1d2d8e',
	code: 0
	data: {
		subData: 'value'
	}
}
```
**请求**
``` json
# ①
# 单次请求（页端发起）
{
	id: '5c7c955607ab5',
	reqType: 'req',
	api: 'socket/v1/request',
	data: {
		reqData: 'request data'
	}
}

# ②
# 单次请求的返回（服务端返回）
{
	id: '5c7c955607ab5',
	reqType: 'req',
	api: 'socket/v1/example',
	data: {
	    response:'response data'
	},
	code: 0
}

```

参考文档
---------------
**基础**

0. [NodeJS中文网](http://nodejs.cn/)
1. [Yarn官网](https://yarnpkg.com/zh-Hans/)
2. [Jade语法参考文档](http://naltatis.github.io/jade-syntax-docs/)
3. [Less参考文档](http://lesscss.cn/)
4. [使用下一代JS语法: ES6](https://www.cnblogs.com/Wayou/p/es6_new_features.html)
5. [Express - Node.js框架](http://www.expressjs.com.cn/4x/api.html)

**常用库**

0. [Bootstrap参考文档](http://v3.bootcss.com/)
1. [React.js框架](http://reactjs.cn/react/docs/getting-started-zh-CN.html)
2. [Vue前端MVVC框架](http://cn.vuejs.org/)
3. [Lodash工具类库](https://www.lodashjs.com/)
4. [Request.js - HTTP请求库](https://github.com/request/request#requestoptions-callback)
5. [Axios.js - 基于 Promise 的HTTP库](https://github.com/axios/axios)

**常用工具**

0. [pm2 : Node应用管理工具](https://www.npmjs.com/package/pm2)
1. [Gulp前端构建工具](http://www.gulpjs.com.cn/)
2. [Browsersync浏览器同步测试工具](http://www.browsersync.cn/)

**扩展**

0. [Express-Session参考文档](https://www.npmjs.com/package/express-session)
1. [Node-cache简易Node缓存](https://www.npmjs.com/package/node-cache)
2. [log4js参考文档](https://github.com/nomiddlename/log4js-node/wiki)
3. [Markdown语法参考文档](http://wowubuntu.com/markdown)
4. [Markdown在线编写](https://maxiang.io/)
5. [Browserify + Gulp + React](https://lincolnloop.com/blog/untangle-your-javascript-browserify/)
6. [使用watchify加速Browserify编译](https://www.gulpjs.com.cn/docs/recipes/fast-browserify-builds-with-watchify/)
7. [配置你的 Gulp + Browserify](https://www.npmjs.com/package/gulp-browserify)
8. [CommonJS和AMD规范](http://javascript.ruanyifeng.com/nodejs/module.html)
9. [使用Babel体验下一代JS语法](https://babeljs.cn/)
10. [Ant Design](https://ant.design/)
11. [React-Bootstrap](https://react-bootstrap.github.io/)

**经验**

1. [JSON-Bigint - 解决JS中大数精度丢失问题](https://www.npmjs.com/package/json-bigint)
2. [IOS中Date函数初始化时间格式不兼容的问题](https://stackoverflow.com/questions/13363673/javascript-date-is-invalid-on-ios)

**第三方**

0. [微信公共平台消息接口服务中间件](https://github.com/node-webot/wechat)
1. [微信公共平台Node库API](http://doxmate.cool/node-webot/co-wechat-api/api.html)
1. [微信公众平台](https://mp.weixin.qq.com/wiki)

**Funny**

0. [Yes or No](https://yesno.wtf/api)

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
> 在拆分前，公共模块也无法很好地利用浏览器端缓存
> 
> **根据项目需要，bower 可用于管理前端样式库**

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
> ECharts是数据可视化JS库

4. [underscore.js工具类库](http://underscorejs.org/)
> underscore是一个轻量级的js工具类库，提供了很多便捷的小方法
>
> 后使用 lodash.js 替换，后者是一个从 underscore fork 出来的项目
>
> 它方法更多，兼容性更好，从 underscore 转移非常方便。

5. [NPM](https://www.npmjs.com) 以及 [淘宝NPM镜像](https://npm.taobao.org/)
> 作为经典的包管理工具，npm为了前后兼容，以及缺乏竞争，出现了许多问题。
>
> 现在发现yarn对比npm , 命令更简洁，版本更准确，速度更快，所以对npm进行了替换
>
> 而由于yarn上包的文档是直接从npm抓取过去的，所以包的文档链接还是保留npm站点的文档链接