const Router = require('koa-router');
const Upload = require('../upload');
//const dbAPI = require('../models/db');

const router = new Router();

router.get('/', async (ctx, next) => {
    await ctx.render("index");
    await next();
});

router.get('/about', async (ctx) => {
    ctx.body = 'About Me';
});

router.get('/login', async (ctx, next) => {
    ctx.body = `
    <form method = "POST" action = "/login">
        <label>User Name</label>
        <input name = "username"/><br/>
        <label>Password</label>
        <input name = "password" type = "password"/><br/>
        <button type = "submit">submit</button>
    </form>
    `;
    await next();
});

router.post('/login', async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    //const result = await dbAPI.checkLogin(username, password);

    if (result) {
        ctx.cookies.set('LoginStatus', true);
        ctx.redirect('/');
    } else {
        ctx.body = `User is not found or password is wrong！`;
    }
});

router.get('/comment', async (ctx, next) => {
    await ctx.render('comment');
    await next();
})

module.exports = router;