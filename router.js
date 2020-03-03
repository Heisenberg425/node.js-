var fs=require('fs');
var path=require('path');
var _=require('underscore');

var musicController=require('./controllers/music');
var url=require('url');

module.exports=function(req,res){
    var urlObj=url.parse(req.url,true);
    req.query=urlObj.query;
    console.log('hello:',urlObj.query);

    var pathname=urlObj.pathname;
    console.log('pathname:',pathname);
    var method=req.method;
    console.log('method:',method);
    if(method=='GET'&&pathname=='/'){
        musicController.showIndex(req,res);
    }
    else if(method=='GET'&&pathname=='/index.html'){
        musicController.showIndex(req,res);
    }
    else if(method=='GET'&&pathname=='1.mp4'){
        musicController.returnMovie(req,res);
    }
    else if(method=='GET'&&pathname.startsWith('/node_modules/')){
        var staticPath=path.join(__dirname,pathname);
        fs.readFile(staticPath,'utf-8',function(err,data){
            if(err){
                return res.end(err.message);
            }
            res.end(data);
        })
    }
    else if(method=='GET'&&pathname=='/add'){
        musicController.showAdd(req,res);
    }
    else if(method=='GET'&&pathname=='/video'){
        musicController.showVideo(req,res);
    }
    else if(method=='GET'&&pathname=='/1.mp4'){
        musicController.returnVideo(req,res);
    }
    else if(method=='GET'&&pathname=='/pic'){
        musicController.showPic(req,res);
    }
    else if(method=='GET'&&pathname=='/pic1.jpg'){
        musicController.returnPic(req,res);
    }
    else if(method=='GET'&&pathname=='/edit'){
        musicController.showEdit(req,res);
    }
    else if(method=='POST'&& pathname=='/add'){
        musicController.doAdd(req,res);
    }
    else if(method=='GET'&& pathname=='/remove'){
        musicController.doRemove(req,res);
    }
    else if(method=='POST'&&pathname=='/edit'){
        musicController.doEdit(req,res);
    }
}