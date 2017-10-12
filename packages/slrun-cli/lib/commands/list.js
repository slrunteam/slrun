const { services } = require('slrun-local-client')

async function list () {
  (await services.list())
    .forEach((service) => console.log(service))
}

module.exports = list
