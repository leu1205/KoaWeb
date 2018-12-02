const mongoose = require('mongoose');

var Elyschema = new mongoose.Schema({
    employee_id: String,
    name: String,
    gender: String,
    title: String,
    updated_at: Date
});

var employees = mongoose.model('Employee', Elyschema);

async function getList() {
    let result = [];
    await employees.find({}, (err, docs) => {
        if (err) throw err;
        result = docs;
    });
    return result;
};

async function getEmployee(employee_id) {
    let result = {};
    await employees.findOne({employee_id: employee_id}, (err, doc)=>{
        if (err) throw err;
        result = doc;
    });
    return result;
}

async function insertEmployee(employee_id, name, gender, title) {
    let data = {
        employee_id: employee_id,
        name: name,
        gender: gender,
        title: title,
        updated_at: Date.now()
    };
    var employee = new employees(data);
    let result = false;

    await employee.save( (err) => {
        if (err) throw err;
    });

    if(await getEmployee(employee_id)) result=true;

    return result;
}

async function modifyEmployee(employee_id, name, gender, title) {
    let  query = {employee_id:employee_id};
    let doc = {
        name: name,
        gender: gender,
        title: title,
        updated_at: Date.now()
    };
    let result = false;

    await employees.update(query, { $set: doc }, (err)=>{
        if(err) throw err;
        result = true;
    });

    return result;
}

async function delEmployee(employee_id) {
    let  query = {employee_id:employee_id};
    employees.remove(query, (err) => {
        if(err)throw err;
        console.log("Done!");
    });
}

var elyAPI = {
    getList: getList,
    getEmployee: getEmployee,
    insertEmployee: insertEmployee,
    modifyEmployee:modifyEmployee,
    delEmployee:delEmployee
};

module.exports = employees;