const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const state = {}

async function startLocalServer () {
  const localPort = process.env.SLRUN_LOCAL_PORT || 4000
  const app = express()
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use('/api', require('./routes/api'))
  app.post('/__slrun__/stop', (req, res) => {
    state.server.close(exitProcess)
    setTimeout(exitProcess, 1000)
    res.send('OK')
  })
  state.server = app.listen(localPort, () => {
    console.log(`local-server is running at http://127.0.0.1:${localPort}`)
  })
}

function exitProcess () {
  process.exit()
}

/* istanbul ignore if */
if (require.main === module) {
  startLocalServer()
}

module.exports = startLocalServer
