const Router = require('koa-router');
const Employee = require('../models/employees');
const router = new Router({
    prefix: "/employees"
});

router.get('/', async (ctx, next) => {
    var data = ctx.req.body;
    await next();
});

router.get('/:employee_id/info', async (ctx, next) => {

    await next();
});

router.post('/:employee_id/info', async (ctx, next) => {
    var employee_id = ctx.params.employee_id;
    var data = ctx.req.body;
    var employee = new Employee();

    employee.employee_id = employee_id;
    employee.name = "王小名";
    employee.gender = "男";
    employee.title = "CEO";
    employee.updated_at = Date.now();

    employee.save(err => {
        if (err) {
            ctx.status = 400;
            ctx.body = "Insert Error"
        } else {
            ctx.status = 201;
            ctx.body = employee;
        }
    });

    await next();
});

router.put('/:employee_id/info', async (ctx, next) => {

});

router.del('/:employee_id/info', async (ctx, next) => {

});

module.exports = router;