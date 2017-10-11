const express = require('express')
const services = require('./api')

const router = express.Router()

router.post('/', async (req, res) => res.send(await services.add(req.body)))

router.delete('/:id', async (req, res) => res.send(await services.remove(req.params.id)))

router.get('/', async (req, res) => res.send(await services.list()))

module.exports = router
