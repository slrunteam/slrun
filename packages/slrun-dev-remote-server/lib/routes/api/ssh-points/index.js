const { run, wait } = require('f-promise')
const express = require('express')
const sshPoints = require('./api')

const router = express.Router()

router.get('/next', (req, res, next) => run(() => {
  try {
    res.send(wait(sshPoints.getNextPoint()))
  } catch (err) {
    next(err)
  }
}))

module.exports = router
