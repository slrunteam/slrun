const { run, wait } = require('f-promise')
const { services } = require('slrun-local-client')

function remove (argv) {
  return run(() => {
    const [, id] = argv._
    wait(services.remove(id))
  })
}

module.exports = remove
