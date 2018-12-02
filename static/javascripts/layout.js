$(document).ready(function(){
    var item6 = $('#menu-item-6 a');
    var item7 = $('#menu-item-7 a');
    
    $('[href="'+this.location.pathname+'"]').addClass('active');
    $('li.nav-item').on('click', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
    
    if(item6.text() === "SIGN UP"){
        item6.attr({'data-toggle':"modal", 'data-target':"#signupModal"});
    } else {
        item6.removeAttr('data-toggle data-target');
    }

    if(item7.text() === "LOG IN"){
        item7.attr({'data-toggle':"modal", 'data-target':"#loginModal"});
    } else {
        item7.removeAttr('data-toggle data-target');
        item7.click(async function() {
            await $.ajax({
                url:"/logout",
                type:"GET"
            });
            location.reload();
        });
    }

    $('#signupForm').submit(async function (e) {
        e.preventDefault();
        if($(this)[0].checkValidity() === false){
            e.stopPropagation();
            $(this).addClass('was-validated');
        } else {
            $(this).removeClass('was-validated');
            var Data = $(this).serialize();
            await $.ajax({
                url: "/signup",
                data: Data,
                type: 'POST',
                statusCode: {
                    200: () => {
                        alert('Done!');
                        location.reload();
                    },
                    400: () => {
                        alert('username was used!');
                    }
                }
            });
        }
    });

    $('#loginForm').submit(async function(e) {
        e.preventDefault();
        if($(this)[0].checkValidity() === false){
            e.stopPropagation();
            $(this).addClass('was-validated');
        } else {
            $(this).removeClass('was-validated');
            var Data = $(this).serialize();
            await $.ajax({
                url: "/login",
                data: Data,
                type: 'POST',
                statusCode: {
                    200: () => {
                        alert('Done!');
                        location.reload();
                    },
                    400: () => {
                        alert('username or password was wrong!');
                    }
                }
            });
        }
    });
});