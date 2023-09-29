const express = require('express')
const ditto = require('./pokemon/ditto.json')

const app = express()

// Express adds a custom header by default. This is the way to remove it
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3069

app.use(express.json())

// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // solo llegan request que son POST y que tienen el header Content-Type: application/json

//   let body = ''

//   // Escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     // llamar a la DDBB para guardar la info
//     data.timestamp = Date.now()
//     // mutamos la request y guardamos la informacion en el req.body
//     req.body = data
//     next()
//   })
// })

app.use((req, res, next) => {
  console.log('middleware 1')
  next()
})

app.get('/', (req, res) => {
  res.send('<h1>My page</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
