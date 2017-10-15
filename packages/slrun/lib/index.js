#!/usr/bin/env node
const parseProcessArgv = require('yargs-parser')
const argv = parseProcessArgv(process.argv.slice(2))
// BD: must populate envs before loading other modules
require('./envs')(argv)
const { run, wait } = require('f-promise')
const { VError } = require('verror')
const ensureStart = require('./ensure-start')
const commands = require('./commands')

function startCLI () {
  return run(() => {
    const command = argv._[0] || 'start'
    // BD: if the command is not start/stop, ensure start has been run
    if (['start', 'stop'].indexOf(command) === -1) {
      wait(ensureStart(argv))
    }
    wait(commands[command](argv))
  })
}

/* istanbul ignore if */
if (require.main === module) {
  startCLI()
    .catch((err) => {
      console.error(VError.info(err), VError.fullStack(err))
      process.exit(1)
    })
}

module.exports = startCLI
