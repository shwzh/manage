const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const router = require('./router');
const zlib = require('zlib');
const { Form } = require('multiparty');
const { HTTP_PORT, HTTP_ROOT, HTTP_UPLOAD } = require('../config');



http.createServer((req, res) => {

  // 1. 解析数据- GET POST FILE
  let { pathname, query } = url.parse(req.url);

  if(req.method === 'post') {

    if(req.header['content-type'].startsWith('application/x-www-from-urlencode')) {
      // 普通的post
      let arr = [];
      req.on('data', buffer => {
        arr.push(buffer)
      })

      req.on('end', () => {
        let post = querystring.parse(Buffer.concat(arr).toString());
        // 找路由
        handle(req.method, pathname, query, post,{})



      })
    } else {
      // 文件post请求
      let form = new Form({
        uploadDir: HTTP_UPLOAD
      });
      form.parse(req);

      let post = {};
      let files = {};

      form.on('field', (name, value) => {
        post[name] = value
      });
      form.on('file', (name, file) => {
        files[name] = file;
      })
      form.on('error', (err) => {
        console.log(err);

      });
      form.on('close', () => {
        handle(req.method, pathname, query, post, files )
      })

      handle(req.method, pathname, query, {}, {})
    }

  } else {
    // 2. 找路由
    handle(req.method, pathname, query, post, file)

  }


  async function handle(method,url,get,post,files) {
    let fn = router.finderRouter(method, url);


    if(!fn) {
      // 文件请求
      let filepath = HTTP_ROOT + pathname;

      fs.stat(filepath, (err, stat) => {
        if(err) {
          res.writeHeader(404);
          res.write('not found');
          res.end()
        } else {
          let rs = fs.createReadStream(filepath);
          let gz = zlib.createGzip;
          res.on(error, () => {});

          res.setHeader('content-encoding', 'gzip');

          rs.pipe(gz).pipe(res);
        }
      })


    } else {
      // 接口请求
      try {
        await fn(res, get, post, files)
      } catch(e) {
        res.writeHeader(500);
        res.write('internet server error')
        res.end()
      }
    }
  }

}).listen(HTTP_PORT);


console.log(`server is start ${HTTP_PORT}`);
