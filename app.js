const Koa = require('koa');
const koaWebpack = require('koa-webpack');

const app = new Koa();
const options = { };
const middleware = await koaWebpack(options);

app.use(middleware);