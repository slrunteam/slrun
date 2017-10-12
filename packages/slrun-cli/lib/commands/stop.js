const { control } = require('slrun-local-client')

async function stop () {
  if (!await control.isStarted()) {
    return
  }
  try {
    await control.stopServer()
  } catch (e) {
  }
}

module.exports = stop
