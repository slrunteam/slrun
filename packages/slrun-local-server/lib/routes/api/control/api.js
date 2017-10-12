exports.getStatus = async function () {
  return 'SL.RUN Local Server'
}

exports.stopServer = async function (server) {
  server.close(exitProcess)
  setTimeout(exitProcess, 1000)
}

function exitProcess () {
  process.exit()
}
