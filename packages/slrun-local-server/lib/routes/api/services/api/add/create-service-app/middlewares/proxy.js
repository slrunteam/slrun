const isUrl = require('is-url')
const { createProxyServer } = require('http-proxy')

function createProxyMiddleware (options) {
  if (!isUrl(options.target)) {
    throw new Error(`${options.target} is not a url`)
  }
  const proxy = createProxyServer({ ...options })
  return Promise.resolve(Object.assign(proxy.web.bind(proxy), { upgrade: proxy.ws.bind(proxy) }))
}

module.exports = createProxyMiddleware
