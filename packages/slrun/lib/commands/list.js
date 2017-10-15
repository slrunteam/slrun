const { run, wait } = require('f-promise')
const { services } = require('slrun-local-client')

function list () {
  return run(() => {
    wait(services.list())
      .forEach((service) => console.log(service))
  })
}

module.exports = list
