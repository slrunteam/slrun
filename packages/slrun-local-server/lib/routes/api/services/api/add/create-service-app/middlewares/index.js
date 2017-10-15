const createProxyMiddleware = require('./proxy')
const createStaticMiddleware = require('./static')

function createServiceMiddleware ({ mode, options }) {
  if (mode === 'PROXY') {
    return createProxyMiddleware(options)
  }
  if (mode === 'STATIC') {
    return createStaticMiddleware(options)
  }
  throw new Error(`Unknown service mode: ${mode}`)
}

module.exports = createServiceMiddleware
