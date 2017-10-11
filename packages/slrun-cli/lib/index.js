#!/usr/bin/env node
const parseProcessArgv = require('yargs-parser')
const { runInBackground } = require('childprocess-helper')
const commands = require('./commands')

async function startCLI (options) {
  const { processArgv } = options
  const argv = parseProcessArgv(processArgv.slice(2))
  const command = argv._[0] || 'start'
  // BD: if the command is not start/stop, try to start first
  if (['start', 'stop'].indexOf(command) === -1) {
    runInBackground(processArgv[0], [processArgv[1], 'start'])
  }
  const exitCode = await commands[command](argv)
  if (exitCode) {
    process.exit(exitCode)
  }
}

/* istanbul ignore if */
if (require.main === module) {
  startCLI({ processArgv: process.argv })
    .catch(console.error)
}

module.exports = startCLI
