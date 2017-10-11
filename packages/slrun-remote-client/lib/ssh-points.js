const createBase = require('./base')

const base = createBase('/ssh-points')

exports.getNextPoint = async () => (await base.get('/next')).data
