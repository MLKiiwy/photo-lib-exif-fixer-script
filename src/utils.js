const indexOf = require('lodash/indexOf');
const replace = require('lodash/replace');
const lowerCase = require('lodash/lowerCase');
const { parse } = require('path');

const extractDateFromDir = (name) => {
    const full = /([0-9]{4})-([0-9]{2})-([0-9]{2})+/
    const onlyYearAndMonth = /([0-9]{4})-([0-9]{2})+/
    const onlyYear = /([0-9]{4})+/
    let parts = full.exec(name);

    if (!parts) {
        parts = onlyYearAndMonth.exec(name);
    }

    if (!parts) {
        parts = onlyYear.exec(name);
    }

    return parts ? `${parts[1] ? parts[1] : '2017'}:${parts[2] ? parts[2] : '01'}:${parts[3] ? parts[3] : '01'} 00:00:00` : '';
}

const extractReadableNameFromDir = (dir) => {
    const pos = indexOf(dir, ' ');
    return pos ? dir.substr(pos + 1) : dir;
}

const extractCleanPhotoNameFromDir = (dir) => {
    let name = extractReadableNameFromDir(dir);
    name = lowerCase(name);
    name = replace(name, 'é', 'e');
    name = name.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
    return replace(name, ' ', '_');
}

const generateNewPhotoName = (photoPath, photoDir) => {
    const clean = extractCleanPhotoNameFromDir(photoDir);
    const { name } = parse(photoPath);
    return `${clean}-${name}`;
};

module.exports = {
    extractDateFromDir,
    extractCleanPhotoNameFromDir,
    extractReadableNameFromDir,
    generateNewPhotoName,
}