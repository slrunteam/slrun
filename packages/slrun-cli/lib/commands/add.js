const { services } = require('slrun-local-client')

async function add (argv) {
  const [, id, base] = argv._
  await services.add({ id, base })
}

module.exports = add
