const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')

const port = process.env.PORT ?? 3069

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        case '/about':
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>About</h1>')
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not Found</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // Escuchar el evento data
          req.on('data', chunk => {
            body += chunk
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a la DDBB para guardar la info
            res.writeHead(201, { 'Content-Type': 'application/json: charset=utf-8' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 Not Found')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`server listening on port http://localhost:${server.address().port}`)
})
