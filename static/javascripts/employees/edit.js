$(document).ready(function(){
    var employee_id = $('h5.card-title').text().substring(3);

    $('#editForm').submit(function(e){
        e.preventDefault();
        if($(this)[0].checkValidity() === false){
            e.stopPropagation();
            $(this).addClass('was-validated');
        } else {
            $(this).removeClass('was-validated');
            var Data = $('#editForm').serialize();
            $.ajax({
                url:"/employees/" + employee_id,
                data: Data,
                type: 'PATCH',
                statusCode: {
                    200: () => {
                        alert('Done!');
                        window.location.assign('/staff');
                    },
                    400: () => {
                        alert('Fail!');
                        window.location.assign('/staff');
                    }
                }
            });
        }
    });
});