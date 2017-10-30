var gulp=require('gulp'),
	server=require('gulp-webserver'),
	url=require('url');
var data=[
	{
		img:"img/3_r1_c1.jpg",
		head:"过去,现在,未来",
		con:"好评，发的顺丰了深刻到拉萨；卡德罗斯；看电视了打开塑料袋上到底是代理商的开始了冻死了都开始是刚刚好。",
		kg:"散装称重1000g"
	},
	{
		img:"img/3_r3_c1.jpg",
		head:"No纳尼",
		con:"好评，发的顺丰了深刻到拉萨；卡德罗斯；看电视了打开塑料袋上到底是代理商的开始了冻死了都开始是刚刚好。",
		kg:"散装称重1000g"
	},
	{
		img:"img/3_r1_c1.jpg",
		head:"海口天空",
		con:"好评，发的顺丰了深刻到拉萨；卡德罗斯；看电视了打开塑料袋上到底是代理商的开始了冻死了都开始是刚刚好。",
		kg:"散装称重1000g"
	}
]
gulp.task("server",function(){
	gulp.src("gulp")
	.pipe(server({
		port:8081,
		middleware:function(req,res,next){
			res.setHeader('Access-Control-Allow-Origin','*');
			res.end(data)
		}
	}))	
})

gulp.task("defaute",['server'])