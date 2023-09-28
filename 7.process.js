// El objeto process es una variable global que proporciona información y control sobre el proceso actual de ejecución
// Tiene propiedades y métodos para:
// 1. Interactuar con el entorno de ejecución de Node.js
// 2. Dar información sobre el proceso actual

// Que puede tener el proceso actual?
// 1. Argumentos de entrada del proceso actual
console.log(process.argv)

// 2. Controlar eventos del proceso
process.on('exit', () => {
  // limpiar los recursos
  console.log('el proceso va a terminar')
})

// 3. Controlar el proceso y su salida
// process.exit(0)
// 0 => todo ha ido bien
// 1 => ha habido un error

// 4. Current working directory
// Nos dice desde que carpeta estamos ejecutando el proceso
const currentWorkingDirectory = process.cwd()
console.log(currentWorkingDirectory)
