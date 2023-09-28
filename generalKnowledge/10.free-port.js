// Aplicacion que nos devuelve un puerto disponible
const net = require('node:net')

function findAvailablePort (desiredPort, incremental = false) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      server.close(() => resolve(desiredPort))
    })

    server.on('error', (err) => {
      if (err.code !== 'EADDRINUSE') {
        reject(err)
        return
      }

      const nextPort = incremental ? desiredPort + 1 : 0
      findAvailablePort(nextPort, incremental).then(resolve)
    })
  })
}

module.exports = {
  findAvailablePort
}
