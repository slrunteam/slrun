const { run, wait } = require('f-promise')
const express = require('express')
const services = require('./api')

const router = express.Router()

router.post('/', (req, res, next) => run(() => {
  try {
    res.send(wait(services.add(req.body)))
  } catch (err) {
    next(err)
  }
}))

router.delete('/:id', (req, res, next) => run(() => {
  try {
    res.send(wait(services.remove(req.params.id)))
  } catch (err) {
    next(err)
  }
}))

router.get('/', (req, res, next) => run(() => {
  try {
    res.send(wait(services.list()))
  } catch (err) {
    next(err)
  }
}))

module.exports = router
