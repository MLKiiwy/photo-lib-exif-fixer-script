const { extractDateFromDir, extractCleanPhotoNameFromDir, extractReadableNameFromDir, generateNewPhotoName } = require('./utils');
const exif = require('piexifjs');
const fs = require('fs-promise');

const tag = async (photoPath, photoDir, targetDir) => {
    const photoContent = await fs.readFile(photoPath, 'binary');
    let exifData = exif.load(photoContent);
    const name = extractReadableNameFromDir(photoDir);
    const cleanName = extractCleanPhotoNameFromDir(photoDir);

    if (!exifData[piexif.ExifIFD.DateTimeOriginal]) {
        exifData[piexif.ExifIFD.DateTimeOriginal] = extractDateFromDir(photoDir);
    }

    if (!exifData[piexif.ExifIFD.UserComment]) {
        exifData[piexif.ExifIFD.UserComment] = cleanName;
    }

    if (!exifData[piexif.ExifIFD.MakerNote]) {
        exifData[piexif.ExifIFD.MakerNote] = name;
    }

    if (!exifData[piexif.ImageIFD.ImageDescription]) {
        exifData[piexif.ImageIFD.ImageDescription] = name;
    }

    const newPhotoName = generateNewPhotoName(photoPath, photoDir);
    const newPhotoContent = exif.insert(exif.dump(exifData), photoContent);
    return fs.writeFile(`${targetDir}/${newPhotoName}.jpg`, new Buffer(newPhotoContent, 'binary'));
}

module.exports = {
    tag,
}