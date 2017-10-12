const createBase = require('./base')

const base = createBase('/control')

exports.getStatus = async () => (await base.get('/status')).data

exports.isStarted = async () => {
  try {
    return await exports.getStatus() === 'SL.RUN Local Server'
  } catch (e) {
    return false
  }
}

exports.stopServer = async () => (await base.post('/stop')).data
