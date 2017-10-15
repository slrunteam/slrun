const { Socket } = require('net')
const { run, wait } = require('f-promise')
const { sshPoints } = require('slrun-remote-client')
const reverseSSHTunnel = require('./reverse-ssh-tunnel')
const createServiceApp = require('./create-service-app')

const localhost = '127.0.0.1'

function add (options) {
  return run(() => {
    const sshPoint = wait(sshPoints.getNextPoint())
    const { sshProxyPort, onSocket } = wait(reverseSSHTunnel(sshPoint))
    const serviceAppInfo = wait(createServiceApp(options))
    const service = {
      ...options,
      localPort: serviceAppInfo.port
    }
    console.log(service, sshProxyPort)
    onSocket((info, accept) => {
      const localSocket = new Socket()
      localSocket.connect(service.localPort, localhost, () => {
        const proxySocket = accept()
        localSocket.pipe(proxySocket).pipe(localSocket)
      })
    })
    return service
  })
}

module.exports = add
