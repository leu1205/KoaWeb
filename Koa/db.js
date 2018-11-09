const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function(){console.log("Connected Successfully!")});

var loginSchema = new mongoose.Schema({
	username:String,
	password:String
});
var blogSchema = new mongoose.Schema({
	id:String,
	content:String
});
var blogListSchema = new mongoose.Schema({
	id:String,
	title:String,
	kind:String
});

var login = db.model("login",loginSchema,"login");
var blog = db.model("blog",blogSchema,"blog");
var blogList = db.model("blogList",blogListSchema,"blogList");

/*var user1 = new login({username:"Jack",password:"test"});
user1.save(function(err){if(err)return handleError(err);});

var query = login.find({username:"Jack"});
query.then(function(doc){
	console.log(doc);
});*/

async function checkLogin(username,password){
	let query =login.where({username:username,password:password});
	let result = await query.findOne(function(err, doc){
		if(err) return handleError(err);
		if(doc!=null){
			return true;
		}
		return false;
	});
	return result;
}

async function getblogList(kind){
	let query = {};
	let result = [];
	if(kind != '/'){
		query = {kind:kind}
	}
	result = await blogList.find(query);
	return result;
}

async function queryID(){
	let tmp = 0;
	await blogList.find({}).sort({id:-1}).limit(1).then(function(doc){
		if(doc.length!=0){
			tmp = doc[0].id;
		}else{
			console.log("conllection is empty!");
		}
		return tmp;
	});
}

async function insertBlogList(title,kind){
	let value = await queryID();
	var blog = new blogList({title:title, kind:kind, id: ++value});
	blog.save(function(err){
		if(err)throw err;
		console.log("Done！");
	});
}

/*var path = require('path').join(__dirname, 'eat.txt');
var iconv = require('iconv-lite')
saveBlog(path,'0');*/

async function saveBlog(path,id){
	var content = require("fs").readFileSync(path,'binary');
	var buf = Buffer.from(content,'binary');
	var ct = iconv.decode(buf,'utf8');
	var query = new blog({content:ct,id:id});
	query.save(function(err){
		if(err) throw err;
		console.log("Done！");
	})
} 

async function readBlog(id){
	var result = await blog.find({id:id});
	return result;
}

function deleteBlogID(id){
	let query = {id:id};
	console.log(query);
	blogList.remove(query).then(doc=>console.log("Done！"));
}

function modifyBlogKind(id,kind){
	let query = {id:id};
	blogList.findOneAndUpdate(query,{kind:kind}).then(doc=>console.log("Done！"));
}

var dbAPI = {
	checkLogin:checkLogin,
	getblogList:getblogList,
	insertBlogList:insertBlogList,
	deleteBlogID:deleteBlogID,
	modifyBlogKind:modifyBlogKind,
	saveBlog:saveBlog,
	readBlog:readBlog
}

module.exports = dbAPI;