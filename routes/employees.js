const Router = require('koa-router');
const employees = require('../models/employees');
const router = new Router({
    prefix: "/employees"
});

router.get("/create", async (ctx, next) => {
    let username = "";
    if(ctx.session.username){
        username = ctx.session.username;
    }

    await ctx.render('./employees/create', {username:username});
    next();
});

router.get("/detail/:employee_id", async (ctx, next) => {
    let employee_id = ctx.params.employee_id;
    let username = "";
    if(ctx.session.username){
        username = ctx.session.username;
    }

    await ctx.render("./employees/detail", {employee_id:employee_id, username:username});
    next();
});

router.get("/edit/:employee_id", async (ctx, next) => {
    let employee_id = ctx.params.employee_id;
    let username = "";
    if(ctx.session.username){
        username = ctx.session.username;
    }

    await ctx.render("./employees/edit", {employee_id:employee_id, username:username});
    next();
});

router.get('/', async (ctx, next) => {
    await employees.find({}, (err, docs) => {
        if (err) {
            ctx.res.statusCode = 400;
        } else {
            ctx.res.statusCode = 200;
            ctx.body = docs;
        }
    });

    next();
});

router.get('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;

    await employees.findOne({employee_id:employee_id}, (err, doc) => {
        if (err) {
            ctx.res.statusCode = 400;
        } else {
            ctx.res.statusCode = 200;
            ctx.body = doc;
        }
    });

    next();
});

router.post('/', async (ctx, next) => {
    let employee_id = 0;
    await employees.findOne().sort({employee_id:-1}).then(function(doc) {
        if(doc != null){
            employee_id = doc.employee_id;
        }
        ++employee_id;
    });

    let data = {
        employee_id: employee_id,
        name: ctx.request.body.eName,
        gender: ctx.request.body.gender,
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        updated_at: Date.now()
    };
    var employee = new employees(data);
    await employee.save().then( doc => {
        if(doc) {
            ctx.res.statusCode = 200;
        } else {
            ctx.res.statusCode = 400;
        }
    });

    next();
});

router.patch('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;

    let  query = {employee_id:employee_id};
    let doc = {
        name: ctx.request.body.eName,
        gender: ctx.request.body.gender,
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        updated_at: Date.now()
    };

    await employees.updateOne(query, { $set: doc }, (err)=>{
        if(err) {
            ctx.res.statusCode = 400;
        } else {
            ctx.res.statusCode = 200;
        }
    });

    next();
});

router.delete('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;
    let  query = {employee_id:employee_id};

    await employees.deleteOne(query, (err) => {
        if(err) {
            ctx.res.statusCode = 400;
        } else {
            ctx.res.statusCode = 200;
        }
    });

    next();
});

module.exports = router;