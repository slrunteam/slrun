#!/usr/bin/env node
const parseProcessArgv = require('yargs-parser')
const populateEnvs = require('./envs')
const argv = parseProcessArgv(process.argv.slice(2))
// BD: must populate envs before loading other modules
populateEnvs(argv)
const ensureStart = require('./ensureStart')
const commands = require('./commands')

async function startCLI () {
  const command = argv._[0] || 'start'
  // BD: if the command is not start/stop, ensure start has been run
  if (['start', 'stop'].indexOf(command) === -1) {
    await ensureStart(argv)
  }
  const exitCode = await commands[command](argv)
  if (exitCode) {
    process.exit(exitCode)
  }
}

/* istanbul ignore if */
if (require.main === module) {
  startCLI().catch(console.error)
}

module.exports = startCLI
