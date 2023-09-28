const path = require('node:path')
// Con el path podemos:
// 1. Contruir nuevas rutas de archivos
// 2. Saber la extensión de un archivo
// 3. Crear rutas absolutas
// etc...

// Car'acter se separacion de las rutas en tu sistema operativo
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename('/tmp/secret-files/password.txt')
console.log(base)

const filename = path.basename('/tmp/secret-files/password.txt', '.txt')
console.log(filename)

const extension = path.extname('image.old.png')
console.log(extension)
