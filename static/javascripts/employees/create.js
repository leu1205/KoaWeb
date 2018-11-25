$(document).ready(function(){
    $('.needs-validation').submit(function(e){
        e.preventDefault();
        if($(this)[0].checkValidity() === false){
            e.stopPropagation();
            $(this).addClass('was-validated');
        } else {
            $(this).removeClass('was-validated');

            $.ajax({
                url:"/employees/",
                data: {
                    name: $('input[name="eName"]').val(),
                    gender: $('select[name="gender"]').val(),
                    title: $('input[name="title"]').val(),
                    content: $('textarea[name="content"]').val()
                },
                type: 'POST',
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