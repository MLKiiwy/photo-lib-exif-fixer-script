const exifReader = require('exifreader');
const fs = require('fs-promise');

module.exports = async filePath => {
    const file = await fs.readFile(filePath);
    return exifReader.load(file.buffer);
}
