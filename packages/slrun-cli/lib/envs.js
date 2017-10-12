function populateEnvs (argv) {
  if (argv.port) {
    process.env.SLRUN_LOCAL_PORT = +argv.port
  }
}

module.exports = populateEnvs
