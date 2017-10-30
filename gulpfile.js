var gulp = require('gulp');		
var connect = require('gulp-connect'); 
var webserver = require('gulp-webserver'); 
var url = require('url'); 
var qs = require('qs'); 
var dataBase = {
    users:[
        {
            name:'zhangsan',
            password:123456
        },
        {
            name:'lisi',
            password:123456
        },
    ]
}
function login(userName,password){
    var exist = false;
    var success = false;
    var users = dataBase['users'];
    for(var i = 0,length = users.length ;i < length ; i++){
        if(userName ==  users[i].name){
            exist = true;
            if(users[i].password == password){
                success = true;
            }
            break;
        }
    }
    return exist ? {success:success} : exist;
}
gulp.task('webTheServer',function(){ // 搭建web服务器
	gulp.src('.') 
		.pipe(webserver({
			port: 8080,
			middleware:function(req,res,next){
				res.setHeader('Access-Control-Allow-Origin','*')
				var meth = req.method 
				var nurl = req.url; 
				var urlObj = url.parse(nurl); 
				var pathname = urlObj.pathname; 
				var getpar = urlObj.query; // 获取？后的内容
				var getparams = qs.parse(getpar);
				if(meth == "GET"){ 
					switch(pathname){
						case "/login":
							var a = login(getparams.user,getparams.pass);
							isTrue(a,res);
						break;
						case "/register":
						break;
						default :
						res.end();
					}
				}else if(meth == "POST"){ 
					if(pathname == '/login'){
						var str = '';
						req.on('data',function(chunk){
							str += chunk;
						});
						req.on('end',function(){
							var obj = qs.parse(str);
							var b = login(obj.user,obj.pass);
							isTrue(b,res);
						})
					}
				}
			}
		}))
})
function isTrue(user,res){
	res.setHeader('content-type','application/json;charset="utf-8"');
	if(user){
		if(user.success){
			res.write(JSON.stringify({success:'登录成功'}))
		}else{
			res.write(JSON.stringify({success:'密码错误'}))
		}
	}else{
		res.write(JSON.stringify({msg:'未注册'}))
	}
	res.end();
}
gulp.task('default',['webTheServer'])