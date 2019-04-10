const process = require('process');

let mode = (process.env.NODE_ENV !== 'develop' ? 'dev' : 'prod')

module.exports = {
  mode,
  ...(mode == 'dev' ? require('./config.dev') : require('./config.prod'))
}
