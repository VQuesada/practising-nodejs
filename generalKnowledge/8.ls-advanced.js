// ls es un comando de linux que lista los archivos de un directorio
const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.'

const ls = async (folder) => {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.error(`Error al leer el directorio: ${folder}`)
    process.exit(1)
  }

  const getFilesStatsPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // status - informacion del archivo
    } catch (err) {
      console.error(`Error al leer el archivo: ${filePath}`)
      process.exit(1)
    }

    return stats
  })

  const statsArray = await Promise.all(getFilesStatsPromises)

  const maxLengths = statsArray.reduce(
    (acc, stat, index) => {
      const fileName = files[index]
      const { size, mtime } = stat
      const fileNameLength = fileName.length
      const sizeLength = size.toString().length
      const modifiedLength = mtime.toLocaleString().length
      return {
        fileName: Math.max(acc.fileName, fileNameLength),
        size: Math.max(acc.size, sizeLength),
        modified: Math.max(acc.modified, modifiedLength),
      }
    },
    { fileName: 0, size: 0, modified: 0 },
  )

  const extraPadding = 2
  const statsPromises = statsArray.map(async (stats, index) => {
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()
    const file = files[index]

    const fileNameValue = file.padEnd(maxLengths.fileName + extraPadding)
    const fileTypeValue = fileType.padEnd(2)
    const fileSizeValue = fileSize
      .toString()
      .padEnd(maxLengths.size + extraPadding)
    const fileModifiedValue = fileModified.padEnd(
      maxLengths.modified + extraPadding,
    )

    return `-File name: ${fileNameValue} -File type: ${fileTypeValue} -File size: ${fileSizeValue} -File modified: ${fileModifiedValue}`
  })

  const filesInfo = await Promise.all(statsPromises)

  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo)
  })
}

ls(folder)
