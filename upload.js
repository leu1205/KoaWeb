const formidable = require('formidable');
const fs = require('fs');
const dbAPI = require('./models/db');

function Upload(ctx){
    var form = new formidable.IncomingForm();
    form.KeepExtensions = true;
    form.uploadDir = __dirname + "/static/html";
    form.parse(ctx.req, function(err, fieds, files){
        if(err) throw err;
        dbAPI.insertBlogList(files.file.name,fieds.kind);
        dbAPI.saveBlog(__dirname + "static/blogs/" + files.file.name,fieds.kind);
        return; 
    });

    
}

module.exports = Upload;