$(function () {
    var employee_id = $("dd").text();

    $.getJSON("/employees/" + employee_id, function (data, status) {
        if (status === "success") {
            $(".card-body").append(`
                <dl class="row">   
                    <dt class="col-sm-3">Name：</dt>
                    <dd class="">${data.name}</dd>
                </dl>
                <dl class="row">
                    <dt class="col-sm-3">Gender：</dt>
                    <dd class="">${data.gender}</dd>
                </dl>
                <dl class="row">
                    <dt class="col-sm-3">Title：</dt>
                    <dd class="">${data.title}</dd>
                </dl>
            `);
        } else {
            $(".card-body").append("404 Not Found");
        }
        $(".card-body").append(`
            <hr>
            <a class="btn btn-primary offset-sm-7" href="/staff">Back List</a>
            <a class="btn btn-success ml-sm-2" href="/employees/edit/${employee_id}">Edit</a>
        `);
    });
});