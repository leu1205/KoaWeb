const koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const static = require('koa-static');
const session = require('koa-session');
const config = require('./config');
const index = require('./routes/index');
const employees = require('./routes/employees');
const Router = require('koa-router');
const mongoose = require('mongoose');
const app = new koa();
const router = new Router;

mongoose.connect(config.mongoDB.koaWeb, {
    useNewUrlParser: true
});

app.use(async function (ctx, next) {
	try {
        await next();
        var status = ctx.status || 404;
        if(status === 404){
            ctx.throw(404);
        }
    } catch (error) {
        ctx.status = error.status || 500;
        if(ctx.status === 404){
            ctx.body = "404 Not Found!";
        } else {
            ctx.body = "Unknow Server Error!";
        }
        if(error.message != 'Not Found'){
            console.error(error);
        }
    }
});

app.keys = [config.cookieSecret];
app.use(bodyParser());
app.use(views(__dirname + "/view", {extension: 'pug'}));
app.use(static(__dirname + "/static", {extensions: ['jpg','css','js']}));
app.use(session(config.session, app));
router.use(index.routes(), index.allowedMethods());
router.use(employees.routes(), employees.allowedMethods());
app.use(router.routes());
app.use(logger());

var server = app.listen(config.PORT, () => {
    var port = server.address().port;
    console.log("App now running on port", port);
});