const path = require('path')
const { fork } = require('childprocess-helper')

function createServiceApp (options) {
  return new Promise((resolve, reject) => {
    fork(path.join(__dirname, 'worker.js'))
      .on('message', ({ type, payload }) => {
        switch (type) {
          case 'info':
            resolve(payload)
            return
          case 'error':
            reject(payload)
        }
      })
      .send({ type: 'create', payload: options })
  })
}

module.exports = createServiceApp
