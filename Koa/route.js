const Router = require('koa-router');
const Upload = require('./upload');
const dbAPI = require('./db');

const router = new Router();

router.get('/',async(ctx,next)=>{
    await ctx.render("index");
    await next();
});

router.get('/about', async(ctx)=>{
    ctx.body = 'About Me';
});

router.get('/user', async(ctx)=>{
    let name = ctx.query.name;
    let msg = ctx.query.msg;
    ctx.body = `<p>${name}:${msg}</p>`;
});

router.get('/login', async(ctx)=>{
    ctx.body = `
    <form method = "POST" action = "/login">
        <label>User Name</label>
        <input name = "username"/><br/>
        <label>Password</label>
        <input name = "password" type = "password"/><br/>
        <button type = "submit">submit</button>
    </form>
    `;
});

router.post('/login', async(ctx)=>{
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    const result = await dbAPI.checkLogin(username,password);

    if(result){
        ctx.cookies.set('LoginStatus',true);
        ctx.redirect('/blogList');
    }else{
        ctx.body = `User is not found or password is wrong！`;
    }
});

router.get('/blogList', async(ctx, next)=>{
    var result = await dbAPI.getblogList('/');
    await ctx.render('blogList',{result:result});
    await next();
});

router.get('/blog/:blodid',async(ctx, next)=>{
    let blodid = ctx.params.blodid;
    let content = await dbAPI.readBlog(blodid);
    ctx.body = content;
    await next();
})

router.get('/comment', async(ctx, next)=>{
    await ctx.render('comment');
    await next();
})

module.exports = router;