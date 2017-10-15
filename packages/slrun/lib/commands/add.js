const path = require('path')
const isUrl = require('is-url')
const { promisify } = require('util')
const isDirectory = promisify(require('is-directory'))
const { run, wait } = require('f-promise')
const { services } = require('slrun-local-client')

const localhost = '127.0.0.1'
const maxPort = 65535

function add (argv) {
  return run(() => {
    const [, id, base] = argv._
    if (isUrl(base)) {
      wait(services.add({ id, mode: 'PROXY', options: { target: base } }))
      return
    }
    const port = +base
    if (Number.isInteger(port) && port > 0 && port <= maxPort) {
      wait(services.add({ id, mode: 'PROXY', options: { target: `http://${localhost}:${port}` } }))
      return
    }
    const basePath = path.resolve(base)
    if (wait(isDirectory(basePath))) {
      wait(services.add({ id, mode: 'STATIC', options: { root: basePath } }))
      return
    }
    throw new Error(`Unknown service base: ${base}`)
  })
}

module.exports = add
