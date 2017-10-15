const { promisify } = require('util')
const { run, wait } = require('f-promise')
const { execInBackground } = require('childprocess-helper')
const { control } = require('slrun-local-client')

const sleep = promisify(setTimeout)

function ensureStart (argv) {
  return run(() => {
    // BD: check if already started
    if (wait(control.isStarted())) {
      return
    }
    execInBackground(process.argv[0], [process.argv[1], 'start'])
    // BD: check if properly started for 5 seconds
    for (let i = 0; i < 50; ++i) {
      if (wait(control.isStarted())) {
        return
      }
      wait(sleep(100))
    }
    throw new Error('Failed to start slrun')
  })
}

module.exports = ensureStart
