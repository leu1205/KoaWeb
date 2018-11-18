const Router = require('koa-router');
const employees = require('../models/employees');
const router = new Router({
    prefix: "/employees"
});

router.get('/', async (ctx, next) => {
    await employees.find({}, (err, docs) => {
        if (err) {
            ctx.status = 400;
            ctx.body = err
        } else {
            ctx.status = 200;
            ctx.body = docs;
        }
    });

    await next();
});

router.get('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;

    await employees.findOne({employee_id:employee_id}, (err, doc) => {
        if (err) {
            ctx.status = 400;
            ctx.body = err;
        } else {
            ctx.status = 200;
            ctx.body = doc;
        }
    });

    await next();
});

router.post('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;

    let data = {
        employee_id: employee_id,
        name: "王小明",
        gender: "男",
        title: "CEO",
        updated_at: Date.now()
    };
    var employee = new employees(data);

    await employee.save((err,doc) => {
        if (err) {
            ctx.status = 400;
            ctx.body = err;
        }
    });

    await next();
});

router.patch('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;

    let  query = {employee_id:employee_id};
    let doc = {
        name: "王大明",
        gender: "男",
        title: "行銷部長",
        updated_at: Date.now()
    };

    await employees.update(query, { $set: doc }, (err)=>{
        if(err) {
            ctx.status = 400;
            throw err;
        }
    });

    await next();
});

router.del('/:employee_id', async (ctx, next) => {
    let employee_id = ctx.params.employee_id;
    let  query = {employee_id:employee_id};

    employees.remove(query, (err) => {
        if(err) {
            ctx.status = 400;
            throw err;
        }
    });

    await next();
});

module.exports = router;