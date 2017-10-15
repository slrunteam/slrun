const { run, wait } = require('f-promise')
const serializeError = require('serialize-error')
const express = require('express')
const helmet = require('helmet')
const statusMonitor = require('express-status-monitor')
const createServiceMiddleware = require('./middlewares')

const localhost = '127.0.0.1'
const randomPort = 0

function createServiceWorker ({ id, mode, options }) {
  return run(() => {
    const serviceMiddleware = wait(createServiceMiddleware({ mode, options }))
    const app = express()
    app.use(helmet())
    app.use(statusMonitor({ title: `${id} status`, path: '/__slrun__/status' }))
    app.use(serviceMiddleware)
    const server = app.listen(randomPort, localhost, () => {
      process.send({
        type: 'info',
        payload: {
          port: server.address().port
        }
      })
    })
    if (serviceMiddleware.upgrade) {
      server.on('upgrade', serviceMiddleware.upgrade)
    }
  })
}

/* istanbul ignore if */
if (require.main === module) {
  process.on('message', ({ type, payload }) => {
    switch (type) {
      case 'create':
        createServiceWorker(payload)
          .catch((err) => {
            process.send({ type: 'error', payload: serializeError(err) })
            process.exit(1)
          })
    }
  })
  process.on('disconnect', () => {
    process.exit()
  })
}

module.exports = createServiceWorker
