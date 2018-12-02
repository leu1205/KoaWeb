$(document).ready(function(){
    $('#createForm').submit(function(e){
        e.preventDefault();
        if($(this)[0].checkValidity() === false){
            e.stopPropagation();
            $(this).addClass('was-validated');
        } else {
            $(this).removeClass('was-validated');
            var Data = $(this).serialize();
            $.ajax({
                url:"/employees/",
                data: Data,
                type: 'POST',
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