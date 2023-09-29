// ls es un comando de linux que lista los archivos de un directorio
const fs = require('node:fs')

fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Error al leer el directorio: ', err)
    return
  }

  files.forEach((file) => {
    console.log(file)
  })
})
