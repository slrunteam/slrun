exports.getServerUrl = function () {
  const localPort = process.env.SLRUN_LOCAL_PORT || 4000
  return `http://127.0.0.1:${localPort}`
}
