const services = []

exports.add = async function (options) {
  const service = {
    ...options
  }
  services.push(service)
  return service
}

exports.remove = async function (id) {
  const index = services.findIndex((service) => service.id === id)
  if (index !== -1) {
    services.splice(index, 1)
  }
}

exports.list = async function () {
  return services
}
