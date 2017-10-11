const axios = require('axios')
const { getServerUrl } = require('./config')

function createBase (basePath) {
  return axios.create({ baseURL: `${getServerUrl()}/api${basePath}` })
}

module.exports = createBase
