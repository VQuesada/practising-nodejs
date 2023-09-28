import { readFile } from 'node:fs/promises'

const showText = (text) => {
  console.log(text)
}

Promise.all([
  readFile('./file.txt', 'utf-8'),
  readFile('./file2.txt', 'utf-8'),
]).then(([text, text2]) => {
  showText(text)
  showText(text2)
})
