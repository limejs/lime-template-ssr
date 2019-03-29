<h2 align="center">lime-template-ssr 服务端渲染模板</h2>

<p align="center">基于 webpack 工作流，采用 Vue SSR 实现服务端同构渲染的 SFB (前后端分离)同构应用</p>

## 注意

* 安装依赖时，开发依赖往根目录装，运行依赖往里面装(目的是为了让backend可以用最少的依赖独立部署)。所谓运行依赖是指node层运行时需要的(如lime.js)，frontend层运行时需要的如vue、vuex。所谓开发依赖是指的node层dev需要的如nodemon，frontend层编译需要的如webpack。

## Feature

* 基于 Babel7 和 webpack4 全面拥抱 ESNext 语法
* 基于 VueSSR 前后端同构，便于复用代码；分离开发，聚合部署
* 可在一个应用内同时支持 SSR、API 开发和传统后端视图渲染
* 支持 static(纯前端渲染) 和 ssr(服务端渲染) 快速切换
* SSR 同时实现了开发模式和生产模式的智能降级策略
* vue-meta 处理 SEO TDKH
* 内置 HMR(hot module replace) 提升开发体验
* source-map 开发环境精确到vue单文件的调试体验
* 基于 koa-static 实现静态资源 cache
* 内置了 LIME 常用的插件，如全局logger函数、bodyParser、ctxlog等，其中 ctxlog() 可打印全息日志(把一个请求的日志收集在一起打印)
* TODO: 前端 code spliting 代码分割 (p0)
* TODO: 使用 ESLINT standard 规范代码 (p1)
* TODO: 后端 api 单测 (p1)
* TODO: 文档 (p1)
* TODO: 发布优化: 静态资源 cdn 化和url自动替换
* 开发cmds目录下的lime命令。用自定义命令优化开发体验（例如编译机编译时，要在根目录和frontend安装开发依赖，backend目录只安装生产依赖）


## 目录划分理念

如果以server思维，虽然可以一目了然看到后端框架，并可以与frontend隔离开，部署时直接部署排除掉frontend的根目录即可。
但会导致frontend代码太深，不容易开发（毕竟vuessr大部分开发任务还是在frontend）

如果以frontend主导，则让后端代码隐藏太多。也会有所欠缺

最终两个并行的方案。对于开发阶段依赖放直在顶层，backend和frontend里面分别安装各自的生产依赖。编译机也是同样的操作，然后编译机把backend发布出去即可。
配置文件可以公用一部分。
至于 backend在开发阶段热加载时会依赖frontend的问题，事实上它只是依赖了frontend的build脚本的为webpack配置。而这里建议所有公共的部分的东西，也别往根目录放（⌛️要放也得以commonjs语法编写（因为目前后端没有用babel）。 之所以不能放，时因为我们要把backend作为发布目录，放在根目录的东西无法自动放到backend里。当然也可以用 lime build来做这件事情（但是这个代码中一般时写死路径，如果build后位置变了，前端时打包的还好，后端就会获取失败。 所以最好是写一份share.js或者叫frontend的配置放在backend/config下吧。
不过一般都是ssr才会用backend配置，所以就把lime config直接注入到上下文里去用吧。用的时候判断server才用。

## Usage

* 立刻开发

    ```bash
    # 安装依赖
    npm install （国内请优先使用淘宝/腾讯镜像源）
    # 开发模式启动。开发模式默认使用 static(纯前端渲染) 
    npm run dev # 其中 PROXY 是指的你的 fiddler 监听地址和端口
    ```

* 切换渲染模式

  为了提升开发体验，开发模式下默认是 static 前端渲染模式；生产环境下默认是 SSR 服务端渲染模式。你可以通过两种方式轻易修改覆盖当前的模式.

  - 方法1： 启动时设置 node 的环境变量 MODE=static/ssr。 其中 static 表示前端渲染，ssr表示后端渲染
  - 方法2：在浏览 URL 后追加 `_mode` 查询字符串: https://boodo.qq.com/?_mode=static/ssr

  注意：在 SSR 模式下，api 请求是从 node层 发出；因此在本地开发时，通常你需要确保node程序自身可以访问到目标接口。如果你的网络需要代理才可访问对方接口，你可以通过: `PROXY=127.0.0.1:8080 npm run dev` 这样的方式来让服务端渲染时可以走代理访问接口。

* 抓包
    - 理论上，对于开发页面本身来说 使用轻量的 Chrome DevTool 开发者工具已经够用
    - 当然，如果你习惯使用 fiddler 或 whistle 抓包，也可以配置浏览器的网络代理来实现 fiddler/whistle 抓包. 例如 fiddler 中可以如下方式配置一个 Extension 规则:

      ```
      Enabled	Match	Action
      Checked	yourdomain.com	x-overrideHost=127.0.0.1:3000 // 这表示让fiddler把 yourdomain.com 这样的域名请求全部转发给本地的3000端口(你启动的node服务)
      ```

* 编译

  ```bash
  npm run build
  ```

  * 发布

  发布时，如果CI支持，请排除掉frontend源码目录及其内部的node_modules(只是被前端开发所依赖)

## Introduction

前后端分离的同构应用在某些方面拓展了前端项目的能力，SSR对爬虫友好度和首屏时间都有一定的改善；语言的同构也带来的前后端代码的复用性。不过，这也给项目结构组织带来了一定的复杂性。


## SEO

项目采用 `vue-meta` 设置页面 tdkh 信息，支持 SSR 和 SPA 两种模式。需要配置页面 meta 信息时，只需在 Vue 组件选项中如下设置:

```js
export default {
  metaInfo() {
    return {
      title: this.baseInfo.name, // 页面标题
      titleTemplate: "", // 标题字符串模板
      // meta 信息
      meta: [
        { name: 'keywords', content: "",
        { name: 'description', content: "" }
      ]
    }
  }
}
```

更多语法请参考: [vue-meta](https://github.com/nuxt/vue-meta)














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
