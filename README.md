# node.js-
前后端视频，图片，网页跳转<br>
暂时支持：
后端采用文件系统，前端可以查看后端的图片和播放视频。


启动方法：node app.js
然后在浏览器上输入自己局域网地址和端口号，在config文件里设置
'''
module.exports={
    port:3000,
    host:'192.168.0.13',
    viewPath:path.join(__dirname,'views'),
    uploadPath:path.join(__dirname,'uploads')
}
'''<br>
只要在浏览器地址框输入：http://192.168.0.13:3000/即可访问。
