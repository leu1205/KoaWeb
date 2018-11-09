$(document).ready(function(){
    $('[href="'+this.location.pathname+'"]').addClass('active');
    $('li.nav-item').on('click', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
    $('#login').click(function(){
        var userName = $('#username').val().trim();
        $('#menu-item-5 a').text(userName);
        $('#menu-item-5 a').removeAttr("data-toggle data-target");
    });
});