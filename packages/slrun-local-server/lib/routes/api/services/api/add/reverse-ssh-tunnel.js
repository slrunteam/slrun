const ssh2 = require('ssh2')

const randomPort = 0

function reverseSSHTunnel (sshPoint) {
  return new Promise((resolve, reject) => {
    const sshClient = new ssh2.Client()
    const onSocket = sshClient.on.bind(sshClient, 'tcp connection')
    sshClient.on('ready', () => {
      sshClient.forwardIn(sshPoint.host, randomPort, (err, sshProxyPort) => {
        if (err) {
          reject(err)
          return
        }
        resolve({
          sshProxyPort,
          onSocket
        })
      })
    })
    connect(sshClient, sshPoint)
  })
}

function connect (sshClient, sshPoint) {
  sshClient.connect({
    host: sshPoint.host,
    port: sshPoint.port,
    username: process.env.TEMP_SSH_USERNAME,
    password: process.env.TEMP_SSH_PASSWORD
  })
}

module.exports = reverseSSHTunnel
