const { run, wait } = require('f-promise')
const { VError } = require('verror')
const createBase = require('./base')

const base = createBase('/ssh-points')

exports.getNextPoint = () => run(() => {
  try {
    return wait(base.get('/next')).data
  } catch (err) {
    throw new VError(err, 'Failed to get next ssh point')
  }
})
