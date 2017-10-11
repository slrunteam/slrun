const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

function startMemoryAPIServer () {
  const serverPort = process.env.SLRUN_MEMORY_API_SERVER_PORT || 4100
  const app = express()
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use('/api', require('./routes/api'))
  app.listen(serverPort, () => {
    console.log(`memory-api-server is running at http://127.0.0.1:${serverPort}`)
  })
}

/* istanbul ignore if */
if (require.main === module) {
  startMemoryAPIServer()
}

module.exports = startMemoryAPIServer
