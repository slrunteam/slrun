const startLocalServer = require('slrun-local-server')

function start () {
  return Promise.resolve(startLocalServer())
}

module.exports = start
