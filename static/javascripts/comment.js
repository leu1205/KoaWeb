$(document).ready(function(){
    $('#cmForm').submit(function(e){
        e.preventDefault();
        if($(this)[0].checkValidity() === false){
            e.stopPropagation();
            $(this).addClass('was-validated');
        }else{
            function getFormatDate(){  
                var nowDate = new Date();   
                var year = nowDate.getFullYear();  
                var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;  
                var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();  
                var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();  
                var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();  
                var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();  
                return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;  
            }
            var now = getFormatDate();
            var name = $('input[name="cName"]').val();
            var content = $('textarea[name="content"]').val();
            $('#main').append(`
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">${name}</h6>
                        <p class="card-text">${content}</p>
                        <small class="offset-sm-10">${now}</small>
                    </div>
                </div>
            `);
            $('textarea[name="content"]').val("");
            $(this).removeClass('was-validated');
        }
    });
});