const http = require('node:http')
const fs = require('node:fs/promises')

const port = process.env.PORT ?? 3069

// ? Most used status codes:
// ? 200 => OK
// ? 301 => Moved Permanently
// ? 400 => Bad Request
// ? 404 => Not Found
// ? 500 => Internal Server Error

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.statusCode = 200 // ya se pone pr defecto, pero al ser un ejemplo lo pongo para recordarlo

  if (req.url === '/') {
    res.end('<h1>Welcome to my página</h1>')
  } else if (req.url === '/beautiful-cat.jpg') {
    fs.readFile('./blanqueta.jpg')
      .then((file) => {
        res.setHeader('Content-Type', 'image/jpg')
        res.statusCode = 200
        res.end(file)
      })
      .catch(() => {
        res.statusCode = 500
        res.end('<h1>Error 500 - Internal Server Error</h1>')
      })
  } else if (req.url === '/contact') {
    res.end('<h1>Contact</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404 Not Found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`server listening on port http://localhost:${server.address().port}`)
})
