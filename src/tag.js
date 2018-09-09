const { formatDate } = require('./utils');
const fsExtra = require('fs-extra');
const moment = require('moment');

const tag = async (ep, sourcePath, targetImagePath, newDate, name, cleanName) => {
    const data = await ep.readMetadata(sourcePath, ['-File:all'])
    const metadata = (data && data.data[0]) || {};
    const newMetadata = {};

    const existing = metadata.DateTimeOriginal || null;
    const dateToApply = existing !== null && moment(existing, 'YYYY:MM:DD HH:mm:ss').isAfter('1999-01-01') ? formatDate(moment(existing, 'YYYY:MM:DD HH:mm:ss')) : formatDate(newDate);

    newMetadata.DateTimeOriginal = dateToApply;
    newMetadata.UserComment = metadata.UserComment || cleanName;
    newMetadata['Caption-Abstract'] = `${ metadata['Caption-Abstract'] || metadata.ImageDescription || ''}|ALBUM|${name}|`;

    await fsExtra.copy(sourcePath, targetImagePath);
    return ep.writeMetadata(targetImagePath, newMetadata, ['overwrite_original']);
}

module.exports = tag;
