const express = require('express')

const router = express.Router()

router.use('/ssh-points', require('./ssh-points'))

module.exports = router
