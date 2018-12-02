const Router = require('koa-router');
const users = require('../models/users');

const router = new Router();

router.get('/favicon.ico', () => {
    return;
});

router.get('/', async (ctx, next) => {
    let username = "";
    if(ctx.session.username){
        username = ctx.session.username;
    }
    
    await ctx.render("index", {username:username});
    next();
});

router.post('/login', async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let data = {
        name:username,
        password:password
    }
    let query = await users.findOne(data);

    if(query){
        ctx.res.statusCode = 200;
        ctx.session.username = username;
    } else {
        ctx.res.statusCode = 400;
    }
    
    next();
});

router.get('/logout', async (ctx, next) =>　{
    ctx.session.username = null;

    ctx.redirect('/');
    next();
});

router.post('/signup', async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let data = {
        name:username,
        password:password
    };
    let query = await users.findOne({name:username});

    if(query){
        ctx.res.statusCode = 400;
    } else {
        var user = new users(data);
        await user.save().then( doc => {
            if(doc) {
                ctx.res.statusCode = 200;
            } else {
                ctx.res.statusCode = 500;
            }
        });
    }

    next();
})

router.get('/comment', async (ctx, next) => {
    let username = "";
    if(ctx.session.username){
        username = ctx.session.username;
    }

    await ctx.render('comment', {username:username});
    next();
})

router.get('/staff', async (ctx, next) => {
    let username = "";
    if(ctx.session.username){
        username = ctx.session.username;
    }

    await ctx.render('staff', {username:username});
    next();
})

module.exports = router;