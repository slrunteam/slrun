exports.getStatus = () => {
  return Promise.resolve('SL.RUN Local Server')
}

exports.stopServer = (server) => {
  server.close(exitProcess)
  setTimeout(exitProcess, 1000)
  return Promise.resolve()
}

function exitProcess () {
  process.exit()
}
