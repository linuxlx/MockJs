var http = require("http"),  
    url = require("url");  
    
function start() {  
    
    function onRequest(request, response) {  
        // 获取请求路径  
        var pathname = url.parse(request.url).pathname;  
    
        // 关闭nodejs 默认访问 favicon.ico  
        if (!pathname.indexOf('/favicon.ico')) {  
            return;   
        };  
        // 返回数据  
        response.writeHead(200, {"Content-type": "text/plain"});  
        // 路由  
        switch(pathname) {  
            case '/':   
                response.write('index');  
                break;  
            case '/user/login':  
                response.write(JSON.stringify({  
                    'code': 200,  
                    'msg': success  
                }));  
                break;  
            case '/user/logout':  
                response.write(JSON.stringify({  
                    'code': 200,  
                    'msg': success  
                }));  
                break;  
            default:  
                response.write('default');  
                break;  
        }  
            
    
        response.end();  
    }  
    
    http.createServer(onRequest).listen(8080);  
    console.log("Server has start!");  
}  
    
start();  