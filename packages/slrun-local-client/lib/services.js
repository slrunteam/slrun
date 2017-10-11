const createBase = require('./base')

const base = createBase('/services')

exports.add = async (options) => (await base.post('/', options)).data

exports.remove = async (id) => (await base.delete(`/${id}`)).data

exports.list = async () => (await base.get('/')).data
