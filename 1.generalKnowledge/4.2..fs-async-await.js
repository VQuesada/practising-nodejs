const fs = require('node:fs/promises')

const showText = (text) => {
  console.log(text)
}

;(async () => {
  console.log('Reading first file...')
  const text = await fs.readFile('./file.txt', 'utf-8')
  showText(text)

  console.log('\nDoing something while reading file...')

  console.log('\nReading second file...')
  const text2 = await fs.readFile('./file2.txt', 'utf-8')
  showText(text2)
})()
