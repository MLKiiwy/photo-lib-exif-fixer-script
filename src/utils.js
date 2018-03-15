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

const extractCleanPhotoNameFromDir = (dir) => {
    return 'clean';
}

const extractReadableNameFromDir = (dir) => {
    return 'readable';
}

const generateNewPhotoName = (photoPath, photoDir) => {
    return 'photoName';
};

module.exports = {
    extractDateFromDir,
    extractCleanPhotoNameFromDir,
    extractReadableNameFromDir,
    generateNewPhotoName,
}