const http = require('node:http')

const port = process.env.PORT ?? 3069

const processRequest = (req, res) => {}

const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`server listening on port http://localhost:${server.address().port}`)
})
