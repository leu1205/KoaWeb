$(document).ready(function() {
    $.getJSON("/employees", function (data, status) {
        if (status === "success") {
            $.each(data, function(i, item){
                $(".card tbody").append(
                    `<tr>
                        <td>${item.employee_id}</td>
                        <td>${item.name}</td>
                        <td>${item.gender}</td>
                        <td>${item.title}</td>
                        <td>
                            <button type="button" onclick="location.href='/employees/detail/${item.employee_id}'" class="btn btn-warning">細節</button> |
                            <button type="button" onclick="location.href='/employees/edit/${item.employee_id}'" class="btn btn-success">編輯</button> |
                            <button type="button" class="btn btn-danger" id="del${item.employee_id}">刪除</button>
                        </td>
                    </tr>`
                );
            });
        }
    });

    $("tbody").on('click', ".btn-danger", function() {
        var employee_id = $(this).attr("id").substring(3);

        $.ajax({
            url: "/employees/" + employee_id,
            type: 'DELETE',
            statusCode: {
                200: function() {
                    location.reload();
                }
            }
        });
    });
});