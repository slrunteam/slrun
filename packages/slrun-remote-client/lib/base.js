const axios = require('axios')

function createBase (basePath) {
  const apiServerUrl = process.env.SLRUN_API_SERVER_URL || 'https://api.sl.run'
  return axios.create({ baseURL: `${apiServerUrl}${basePath}` })
}

module.exports = createBase
