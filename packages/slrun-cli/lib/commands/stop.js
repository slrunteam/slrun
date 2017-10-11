const axios = require('axios')
const { serverUrl } = require('slrun-local-client')

async function stop () {
  await axios.post(`${serverUrl}/__slrun__/stop`)
}

module.exports = stop
