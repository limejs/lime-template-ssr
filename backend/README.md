# lime-tpl-standard

基础项目模板

## 用法

只需用 Node 执行站点目录下的 entry.js，则会在本地启动一个 HTTP 服务器，并监听默认的 3000 端口

```bash
node ./entry.js
# 或使用 npm script
npm run dev
```

npm run dev 可以支持监控代码改动自动重启， `npm start` 则是生产环境的启动方式。同时两个环境分别使用 `NODE_ENV` 为 development 和 production 的环境变量，从而允许你在配置文件中使用不同环境配置

改变监听端口:

```bash
PORT=8080 npm run dev
```

打开调试日志:

```bash
// 打开日志后，可在控制台看到内核的调试日志，方便定位问题
DEBUG=lime:* npm run dev
```

如果你有自己的 Web Server, 则可以直接引用 entry.js, 我们已经导出了一个基本的 http handler 处理器. 示例用法:

```js
// your server code
const http = require('http')
const app = require('./yoursite/entry.js')
http.createServer(app).listen(8080)
```

## 目录结构说明

```js
|- config 站点配置
    |- site.js 站点配置
    |- 数据库和缓存配置
|- src 站点业务逻辑
    |- controllers 控制器
    |- models 模型
    |- views 视图 
|- node_modules node依赖模块
|- plugin 自定义插件
|- entry.js 站点主入口，可使用 node entry.js 启动站点
|- package.json 包描述
```

## 配置

要求必须在站点根目录下放置 entry.js 和 config目录，config目录下目前有3个配置文件。分别负责 持久化(存储层) store.js、站点基础信息 site.js 的配置。

### 站点基本信息配置

`config/site.js`

### 路由配置

`config/router.js`

### 数据库配置

`config/store.js`

mongodb 安装，mongodb用户创建，

## 环境变量说明

* DEBUG=lime:* 打开框架内核的调试日志；你也可以选择性地打开 lime:store, lime:controller, lime:router 等模块的调试日志
* NODE_ENV: 可选 development 或 production
* PORT: node http server 监听的端口号


## 视图支持

默认支持 handlebars 模板引擎，可支持在 config/site.js 中配置所有被 [consolidate](https://github.com/tj/consolidate.js/) 所支持的模板引擎
