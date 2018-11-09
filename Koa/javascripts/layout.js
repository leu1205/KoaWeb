$(document).ready(function(){
    $('[href="'+this.location.pathname+'"]').addClass('active');
    $('li.nav-item').on('click', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
});