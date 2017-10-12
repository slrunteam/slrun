const { promisify } = require('util')
const { runInBackground } = require('childprocess-helper')
const { control } = require('slrun-local-client')

const sleep = promisify(setTimeout)

async function ensureStart (argv) {
  // BD: check if already started
  if (await control.isStarted()) {
    return
  }
  runInBackground(process.argv[0], [process.argv[1], 'start'])
  // BD: check if properly started for 5 seconds
  for (let i = 0; i < 50; ++i) {
    if (await control.isStarted()) {
      return
    }
    await sleep(100)
  }
  throw new Error('Failed to start slrun')
}

module.exports = ensureStart
