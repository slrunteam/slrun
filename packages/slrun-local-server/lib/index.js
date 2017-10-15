const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { VError } = require('verror')

const state = {}

function startLocalServer () {
  const localPort = process.env.SLRUN_LOCAL_PORT || 4000
  const app = express()
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use('/api', require('./routes/api')(state))
  app.use((err, req, res, next) => {
    console.error(VError.info(err), VError.fullStack(err))
    res.sendStatus(err.status || 500)
  })
  state.server = app.listen(localPort, () => {
    console.log(`local-server is running at http://127.0.0.1:${localPort}`)
  })
}

/* istanbul ignore if */
if (require.main === module) {
  startLocalServer()
}

module.exports = startLocalServer
