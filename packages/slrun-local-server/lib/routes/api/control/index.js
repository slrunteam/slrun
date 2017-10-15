const { run, wait } = require('f-promise')
const express = require('express')
const control = require('./api')

function createControlRouter (state) {
  const router = express.Router()
  router.get('/status', (req, res, next) => run(() => {
    try {
      res.send(wait(control.getStatus()))
    } catch (err) {
      next(err)
    }
  }))
  router.post('/stop', (req, res, next) => run(() => {
    try {
      wait(control.stopServer(state.server))
      res.send('OK')
    } catch (err) {
      next(err)
    }
  }))
  return router
}

module.exports = createControlRouter
