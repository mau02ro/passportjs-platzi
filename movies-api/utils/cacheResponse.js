const { config } = require('../config');

function cacheResponse(res, sconds) {
  console.log(config.dev);
  if (config.dev) {
    res.set('Cache-Control', `public,max-age=${sconds}`);
  }
}

module.exports = cacheResponse;
