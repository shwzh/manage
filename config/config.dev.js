process.env.NODE_ENV = 'development';

const path = require('path');

module.exports = {
  // database
  DB_HOST: 'localhost',
  DB_PORT: 3306,
  DB_USER: 'root',
  DB_PASS: '111222333',
  DB_NAME: 'node_use',


  // http
  HTTP_PORT: 8080,
  HTTP_ROOT: path.resolve(__dirname, '../static/'),
  HTTP_UPLOAD: path.resolve(__dirname, '../static/upload/')

}
