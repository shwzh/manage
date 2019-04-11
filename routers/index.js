const { addRouter } = require('../lib/router');


addRouter('get', '/list', require('./list'));
addRouter('post', '/add', require('./add'));
addRouter('delete', '/delete', require('./del'));
