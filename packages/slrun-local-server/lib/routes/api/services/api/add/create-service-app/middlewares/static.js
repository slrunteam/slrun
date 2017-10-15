const { promisify } = require('util')
const isDirectory = promisify(require('is-directory'))
const { run, wait } = require('f-promise')
const ecstatic = require('ecstatic')

function createStaticMiddleware (options) {
  return run(() => {
    if (!wait(isDirectory(options.root))) {
      throw new Error(`${options.root} is not a directory`)
    }
    return ecstatic({ showDir: false, cache: 0, ...options })
  })
}

module.exports = createStaticMiddleware
