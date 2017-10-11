const { getServerUrl } = require('./config')

exports.serverUrl = getServerUrl()

exports.services = require('./services')
