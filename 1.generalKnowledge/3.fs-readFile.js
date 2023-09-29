const fs = require('node:fs')

// * To use promises with native modules when they don't have a promisified version
const { promisify } = require('node:util')
const readFile = promisify(fs.readFile)

const showText = (err, text) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(text)
}

console.log('Reading first file...')
fs.readFile('./file.txt', 'utf-8', showText) // * Using callback

console.log('\nDoing something while reading file...')

console.log('\nReading second file...')
readFile('./file2.txt', 'utf-8').then(showText) // * Using promisified function
