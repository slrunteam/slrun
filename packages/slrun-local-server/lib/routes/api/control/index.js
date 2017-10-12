const express = require('express')
const control = require('./api')

function createControlRouter (state) {
  const router = express.Router()
  router.get('/status', async (req, res) => res.send(await control.getStatus()))
  router.post('/stop', async (req, res) => {
    await control.stopServer(state.server)
    res.send('OK')
  })
  return router
}

module.exports = createControlRouter
