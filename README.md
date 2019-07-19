本插件运行于nodejs环境，依赖canvas
code2img:
let code = '一段代码或者文本';
const code2img = require ( 'code2img' ).code2img;
codeimg( code ) 返回一个canvas对象，可以对此对象操作获取base64或者转为2进制

img2code:
let path = '图片地址';
const {img2code} = require ( 'code2img' ).img2code;
img2code ( path ).then ( str => console.log ( str )); 返回一个promise对象