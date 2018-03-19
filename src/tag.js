const { extractDateFromDir, extractCleanPhotoNameFromDir, extractReadableNameFromDir, generateNewPhotoName } = require('./utils');
const exif = require('piexifjs');
const fs = require('fs-promise');

const tag = async (photoPath, photoDir, targetDir) => {
    const photoContent = await fs.readFile(photoPath, 'binary');
    let exifData = exif.load(photoContent);
    const name = extractReadableNameFromDir(photoDir);
    const cleanName = extractCleanPhotoNameFromDir(photoDir);


    if (!exifData['Exif'][exif.ExifIFD.DateTimeOriginal]) {
        console.log('set date :', extractDateFromDir(photoDir));
        exifData['Exif'][exif.ExifIFD.DateTimeOriginal] = extractDateFromDir(photoDir);
    }
    console.log(exif.ExifIFD.DateTimeOriginal);

    if (!exifData['Exif'][exif.ExifIFD.UserComment]) {
        exifData['Exif'][exif.ExifIFD.UserComment] = cleanName;
    }

    if (!exifData['Exif'][exif.ExifIFD.MakerNote]) {
        exifData['Exif'][exif.ExifIFD.MakerNote] = name;
    }

    if (!exifData[exif.ImageIFD.ImageDescription]) {
        exifData[exif.ImageIFD.ImageDescription] = name;
    }


//    const exifObj = {"0th":zeroth, "Exif":exif, "GPS":gps};
    const newPhotoName = generateNewPhotoName(photoPath, photoDir);
    const newPhotoContent = exif.insert(exif.dump(exifData), photoContent);
    return fs.writeFile(`${targetDir}/${newPhotoName}.jpg`, new Buffer(newPhotoContent, 'binary'));
}

module.exports = {
    tag,
}