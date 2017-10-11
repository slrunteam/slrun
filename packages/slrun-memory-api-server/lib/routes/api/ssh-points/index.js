const express = require('express')
const sshPoints = require('./api')

const router = express.Router()

router.get('/next', async (req, res) => res.send(await sshPoints.getNextPoint()))

module.exports = router
