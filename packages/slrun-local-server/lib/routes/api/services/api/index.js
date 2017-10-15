const { run, wait } = require('f-promise')
const add = require('./add')

const services = []

exports.add = (options) => run(() => {
  const service = wait(add(options))
  services.push(service)
  return service
})

exports.remove = (id) => {
  const index = services.findIndex((service) => service.id === id)
  if (index !== -1) {
    services.splice(index, 1)
  }
  return Promise.resolve()
}

exports.list = () => {
  return Promise.resolve(services)
}
