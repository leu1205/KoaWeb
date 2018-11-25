$(document).ready(function(){
    var employee_id = $('h5.card-title').text().substring(3);

    $('.needs-validation').submit(function(e){
        e.preventDefault();
        if($(this)[0].checkValidity() === false){
            e.stopPropagation();
            $(this).addClass('was-validated');
        } else {
            $(this).removeClass('was-validated');

            $.ajax({
                url:"/employees/" + employee_id,
                data: {
                    name: $('input[name="eName"]').val(),
                    gender: $('select[name="gender"]').val(),
                    title: $('input[name="title"]').val(),
                    content: $('textarea[name="content"]').val()
                },
                type: 'PATCH',
                statusCode: {
                    200: function() {
                        alert('back to list');
                        window.location.assign('/staff');
                    }
                }
            });
        }
    });
});