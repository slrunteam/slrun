const express = require('express')

function createAPIRouter (state) {
  const router = express.Router()
  router.use('/control', require('./control')(state))
  router.use('/services', require('./services'))
  return router
}

module.exports = createAPIRouter
