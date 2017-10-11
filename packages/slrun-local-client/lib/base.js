const axios = require('axios')

function createBase (basePath) {
  const localPort = process.env.SLRUN_LOCAL_PORT || 4000
  return axios.create({ baseURL: `http://127.0.0.1:${localPort}/api${basePath}` })
}

module.exports = createBase
