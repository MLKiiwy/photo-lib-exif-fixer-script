const { formatDate } = require('./utils');
const exif = require('piexifjs');
const fs = require('fs-promise');
const fsExtra = require('fs-extra');
const moment = require('moment');

const tag = async (sourcePath, targetImagePath, newDate, name, cleanName) => {
    const source = await fs.readFile(sourcePath, 'binary');
    const exifData = exif.load(source);

    const existing = exifData['Exif'][exif.ExifIFD.DateTimeDigitized] || exifData['Exif'][exif.ExifIFD.DateTimeOriginal] || exifData['Exif'][exif.ExifIFD.DateTime] || null;
    const dateToApply = existing !== null && moment(existing, 'YYYY:MM:DD HH:mm:ss').isAfter('1999-01-01') ? formatDate(moment(existing, 'YYYY:MM:DD HH:mm:ss')) : formatDate(newDate);

    exifData['Exif'][exif.ExifIFD.DateTimeDigitized] = dateToApply;
    exifData['Exif'][exif.ExifIFD.DateTimeOriginal] = dateToApply;
    exifData['0th'][exif.ImageIFD.DateTime] = dateToApply;

    if (!exifData['Exif'][exif.ExifIFD.UserComment]) {
        exifData['Exif'][exif.ExifIFD.UserComment] = cleanName;
    }

    if (!exifData['0th'][exif.ImageIFD.ImageDescription]) {
        exifData['0th'][exif.ImageIFD.ImageDescription] = name;
    }

    return fsExtra.outputFile(targetImagePath, new Buffer(exif.insert(exif.dump(exifData), source), 'binary'));
}

module.exports = tag;
