const fs = require('fs')
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file) {
    //moving file from tmp to uploads
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      //check if has the file
      await fs.promises.stat(filePath)

    } catch (err) {
      return
    }

    // remove file from diskStorage
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage