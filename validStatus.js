function validStatus(ctx,next){
	if(! ctx.cookies.get('LoginStatus') && ctx.url != "/login"){
		ctx.redirect("/login");
	}else{
        return next();
    }
}

module.exports = validStatus;