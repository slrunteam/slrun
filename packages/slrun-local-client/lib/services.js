const { run, wait } = require('f-promise')
const { VError } = require('verror')
const createBase = require('./base')

const base = createBase('/services')

exports.add = (options) => run(() => {
  try {
    return wait(base.post('/', options)).data
  } catch (err) {
    throw new VError({ cause: err, info: options }, 'Failed to add service')
  }
})

exports.remove = (id) => run(() => {
  try {
    return wait(base.delete(`/${id}`)).data
  } catch (err) {
    throw new VError(err, 'Failed to remove service: %s', id)
  }
})

exports.list = () => run(() => {
  try {
    return wait(base.get('/')).data
  } catch (err) {
    throw new VError(err, 'Failed to list services')
  }
})
