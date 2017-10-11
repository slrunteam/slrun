const { services } = require('slrun-local-client')

async function remove (argv) {
  const [, id] = argv._
  await services.remove(id)
}

module.exports = remove
