const koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const static = require('koa-static');
const session = require('koa-session');
const validStatus = require('./validStatus');
const index = require('./routes/index');
const employees = require('./routes/employees');
const Router = require('koa-router');
const app = new koa();
const router = new Router;

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
app.use(static(__dirname + "/static", {extensions: ['jpg','css']}));
//app.use(validStatus);
router.use(index.routes(), index.allowedMethods());
router.use(employees.routes(), employees.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
app.use(logger());

var server = app.listen(3000,()=>{
    var port = server.address().port;
    console.log("App now running on port", port);
});