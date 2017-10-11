const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

function startLocalServer () {
  const localPort = process.env.SLRUN_LOCAL_PORT || 4000
  const app = express()
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use('/api', require('./routes/api'))
  app.listen(localPort, () => {
    console.log(`local-server is running at http://127.0.0.1:${localPort}`)
  })
}

/* istanbul ignore if */
if (require.main === module) {
  startLocalServer()
}

module.exports = startLocalServer
