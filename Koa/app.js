const koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const static = require('koa-static');
const session = require('koa-session');
const validStatus = require('./validStatus');
const router = require('./route');
const path = require('path');
const app = new koa();
/*const config = {
    key: 'login',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    secure: true,
    signed: false
}*/
//router.use(session(app));

app.use(bodyParser());
app.use(views(__dirname + "/view", {extension: 'pug'}));
app.use(static(__dirname, {extensions: ['jpg','css']}));
//app.use(validStatus);
app.use(router.routes());
app.use(logger());



app.listen(3000);