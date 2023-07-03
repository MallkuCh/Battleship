const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const router = require('./routes');
const orm = require('./models');
const cors = require('@koa/cors')

const app = new Koa();

/// Exponer el orm a la app
// app.context.orm = orm;

app.context.orm = orm;

app.use(cors());
app.use(KoaLogger());
app.use(koaBody());

app.use(router.routes());

module.exports = app;
