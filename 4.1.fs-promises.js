const fs = require('node:fs/promises')

const showText = (text) => {
  console.log(text)
}

console.log('Reading first file...')
fs.readFile('./file.txt', 'utf-8').then(showText)

console.log('\nDoing something while reading file...')

console.log('\nReading second file...')
fs.readFile('./file2.txt', 'utf-8').then(showText)
