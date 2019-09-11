const fs = require('fs-extra')
const path = require('path')
const folder = './tests/'
const ORIGINALS_FOLDER = './tests/alkup'
const REVISIONS_FOLDER = './tests/rev/'

const buExt = '.bak'
const dwgExt = '.dwg'

fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    console.log('file: ' + file)
    const ext = path.extname(file)
    if (ext !== '') {
      //If file is a backup, Delete then
      if (ext === buExt) {
        const fileToDelete = folder + file
        DeleteFiles(fileToDelete)
      }
      //If DWG file, copy DWG file to ORIGINALS for back up reasons
      if (ext === dwgExt) {
        const sourceFile = folder + file
        CopyFile(sourceFile, ORIGINALS_FOLDER)
      }
      //Move other files to folder
      else {
        src = folder + file
        dest = REVISIONS_FOLDER + file
        fs.move(src, dest)
          .then(() => 
            console.log(`File ${file} moved to folder ${REVISIONS_FOLDER}`) 
            )
      }
    }
  })
})

/*
function CopyFile(src, dest) {
  fs.copyFile(src, dest, (err) => {
    if(err) console.error('Error on copy file ' + err)
    console.log(`file copied from ${src} to ${dest}`)
  })
}*/

// With async/await:
async function CopyFile (src, dest) {
  try {
    await fs.copy(src, dest)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}



function MoveFile(file, src, dest) {
  return new Promise((resolve, reject) => {
    fs.move(src, dest)
    .then(() => {
      resolve(console.log(`File ${file} moved to folder ${dest}`))
    })
    .catch((err) => reject(err))
  })
}

function DeleteFiles(src) {
  fs.remove(src)
    .then(() => console.log(src + ' REMOVED'))
    .catch(err => console.error('Error when deleting ' + err))
}