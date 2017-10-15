const { run, wait } = require('f-promise')
const { VError } = require('verror')
const createBase = require('./base')

const base = createBase('/control')

exports.getStatus = () => run(() => {
  try {
    return wait(base.get('/status')).data
  } catch (err) {
    throw new VError(err, 'Failed to get status')
  }
})

exports.isStarted = () => run(() => {
  try {
    return wait(exports.getStatus()) === 'SL.RUN Local Server'
  } catch (e) {
    return false
  }
})

exports.stopServer = () => run(() => {
  try {
    return wait(base.post('/stop')).data
  } catch (err) {
    throw new VError(err, 'Failed to stop server')
  }
})
