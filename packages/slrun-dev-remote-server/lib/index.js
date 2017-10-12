const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

async function startRemoteServer () {
  const remotePort = process.env.SLRUN_REMOTE_PORT || 4100
  const app = express()
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use('/api', require('./routes/api'))
  app.listen(remotePort, () => {
    console.log(`remote-server is running at http://127.0.0.1:${remotePort}`)
  })
}

/* istanbul ignore if */
if (require.main === module) {
  startRemoteServer()
}

module.exports = startRemoteServer
