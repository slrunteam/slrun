const { run, wait } = require('f-promise')
const { control } = require('slrun-local-client')

function stop () {
  return run(() => {
    if (!wait(control.isStarted())) {
      return
    }
    try {
      wait(control.stopServer())
    } catch (e) {
      console.log(1, e)
    }
    console.log(2)
  })
}

module.exports = stop
