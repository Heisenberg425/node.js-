var formidable = require('formidable');
var config=require('../config');
var fs=require('fs');
var path=require('path');
const qstring = require("querystring");

exports.showIndex=function(req,res){
    res.render('index',{
        title:'Index',
        musicList:storage
    })
};

exports.showAdd=function(req,res){
    res.render('add',{
        title:'添加音乐'
    })
};

//看视频
exports.showVideo=function(req,res){
    res.render('video',);
};

// exports.returnMovie=function(req,res){
//     fs.readFile(path.join(config.viewPath,viewName)+'1.mp4','utf-8',function(err,data){
//         if(err){
//             return res.end(err.message);
//         }
//         res.end(data.toString());
//     });
// };

exports.returnVideo=function(req,res){
    console.log('aaaa:'+path.join(config.viewPath,'/'));
    fs.readFile(path.join(config.viewPath,'/')+'1.mp4',function(err,data){
        if(err){
            return res.end(err.message);
        }
        res.end(data);
    });
    // res.writeHead(200, {'Content-Type': 'video/mp4'});  
    //       var rs = fs.createReadStream(path.join(config.viewPath,'/')+'1.mp4');  
          
    //       rs.pipe(res);  
          
    //       rs.on('end',function(){  
    //         res.end();  
    //         console.log('end call');  
    //       });
};

exports.returnPic=function(req,res){
    console.log('hhh:'+path.join(config.viewPath,'/'));
    // fs.readFile(path.join(config.viewPath,'/')+'pic1.jpg',function(err,data){
    //     if(err){
    //         return res.end(err.message);
    //     }
    //     res.end(data);
    // });
    //管道操作
          var rs = fs.createReadStream(path.join(config.viewPath,'/')+'pic1.jpg');  
          
          rs.pipe(res);  
          
          rs.on('end',function(){  
            res.end();  
            console.log('end call');  
          });
};


exports.showPic=function(req,res){
    res.render('pic',);
};

exports.showEdit=function(req,res){
    var id=req.query.id;
    var music={}
    storage.forEach(function(item,index){
        if(item.id==id){
            music=item;
        }
    })
    res.render('edit',{
        title:'编辑音乐',
        music:music
    })
}

exports.doAdd=function(req,res){
    var form=new formidable.IncomingForm();
    form.uploadDir=config.uploadPath;
    form.keepExtensions=true;
    form.parse(req,function(err,fields,files){
        if(err){
            return res.end(err.message);
        }
        var title=fields.title;
        var singer=fields.singer;
        var music=path.basename(files.music.path);
        var poster=path.basename(files.poster.path);
        var id=0;
        storage.forEach(function(item){
            if(item.id>id){
                id=item.id;
            }
        })
        storage.push({
            id:id+1,
            title:title,
            singer:singer,
            music:music,
            poster:poster
        })
        // res.writeHead(302,{'Location':'127.0.0.1:3000/'});
        // res.end();
        res.render('index',{
            title:'Index',
            musicList:storage
        });
    })
}

exports.doRemove=function(req,res){
    var id=req.query.id;
    var music_index=0;
    storage.forEach(function(item,index){
        if(item.id==id){
            music_index=index;
        }
    })

    storage.splice(music_index,1);
    res.writeHead(302,{'Location':'http://127.0.0.1:3000/'});
    res.end()
}

exports.doEdit=function(req,res){
    console.log('do edit被执行了');
    var id=req.query.id;
    var data='';
    req.on('data',function(chunk){
        data+=chunk;
    })
    req.on('end',function(){
        var postBody=qstring.parse(data);
        var music_index=0;
        storage.forEach(function(item,index){
            if(item.id==id){
                music_index=index;
            }
        })
        storage[music_index].title=postBody.title;
        storage[music_index].singer=postBody.singer;
        res.writeHead(302,{
            'Location':'http://127.0.0.1:3000/'
        })
        res.end();
    })
}

var storage=[
    {id:1,title:'富士山下',singer:'陈奕迅',music:'陈奕迅-富士山下.mp3'},
    {id:2,title:'青花瓷',singer:'周杰伦',music:'周杰伦-青花瓷.mp3'}
]